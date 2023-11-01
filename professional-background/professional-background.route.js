import express from 'express'
import {promptWithBackground} from "../common/llm.js"
import {PromptTemplate} from "langchain/prompts"
import {
    educationPrompt,
    employmentPrompt,
    selfEmploymentPrompt,
    unemploymentPrompt
} from "./professional-background.prompt.js"
import {cacheMiddleware} from "../common/caching.js";

const router = express.Router()

const education = {
    information: "education",
    prompt: PromptTemplate.fromTemplate(educationPrompt),
    question: `What schools/universities did the person attend?`,
    entries: 5
}
const employment = {
    information: "employment",
    prompt: PromptTemplate.fromTemplate(employmentPrompt) ,
    question: `What employment relationship was the person in?"`,
    entries: 10
}
const selfEmployment = {
    information: "selfEmployment",
    prompt: PromptTemplate.fromTemplate(selfEmploymentPrompt),
    question: `Which companies has the person founded or owned?"`,
    entries: 5
}
const unemployment = {
    information: "unemployment",
    prompt: PromptTemplate.fromTemplate(unemploymentPrompt),
    question: `Was the person unemployed?`,
    entries: 5
}

router.post('/professionalBackground/professionalBackgroundNew', cacheMiddleware(5), async (req, res) => {
    await process(req, res, [education, employment, selfEmployment, unemployment], 'professionalBackground')
})

router.post('/professionalBackground/education', cacheMiddleware(5), async (req, res) => {
    await process(req, res, [education], 'education')
})

router.post('/professionalBackground/employment', cacheMiddleware(5), async (req, res) => {
    await process(req, res, [employment], 'employment')
})

router.post('/professionalBackground/unemployment', cacheMiddleware(5), async (req, res) => {
    await process(req, res, [unemployment], 'unemployment')
})

router.post('/professionalBackground/selfEmployment', cacheMiddleware(5), async (req, res) => {
    await process(req, res, [selfEmployment], 'selfEmployment')
})

async function process(req, res, promptGroup, endpointName) {
    const {partnerId} = req.body
    if (partnerId) {
        await promptWithBackground(partnerId, res, endpointName, promptGroup)
    } else {
        res.status(400).json({
            "message": "Missing property: partnerId"
        })
    }
}

export {
    router
}