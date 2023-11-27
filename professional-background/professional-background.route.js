import express from 'express'
import {PromptTemplate} from "langchain/prompts"
import {
    educationPrompt,
    employmentPrompt,
    selfEmploymentPrompt,
    unemploymentPrompt
} from "./professional-background.prompt.js"
import {cacheMiddleware} from "../common/caching.js";
import {
    processWithBackground
} from "../common/prompting.service.js";

const router = express.Router()

const education = {
    information: "education",
    prompt: PromptTemplate.fromTemplate(educationPrompt),
    questions: [
        `What schools did the person attend?`,
        `What universities did the person attend?`,
        'Which academic degrees does the person have?',
        `Which academic titles does the person hold?`
    ],
    entries: 5
}
const employment = {
    information: "employment",
    prompt: PromptTemplate.fromTemplate(employmentPrompt) ,
    questions: [`What employment relationship was the person in?"`],
    entries: 10
}
const selfEmployment = {
    information: "selfEmployment",
    prompt: PromptTemplate.fromTemplate(selfEmploymentPrompt),
    questions: [`Which companies has the person founded or owned?"`],
    entries: 10
}
const unemployment = {
    information: "unemployment",
    prompt: PromptTemplate.fromTemplate(unemploymentPrompt),
    questions: [`Was the person unemployed?`],
    entries: 10
}

router.post('/professionalBackground/professionalBackgroundNew', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, education, employment, selfEmployment, unemployment)
})

router.post('/professionalBackground/education', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, education)
})

router.post('/professionalBackground/employment', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, employment)
})

router.post('/professionalBackground/unemployment', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, unemployment)
})

router.post('/professionalBackground/selfEmployment', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, selfEmployment)
})

async function processRequest(req, res, ...promptGroup) {
    const { partnerId } = req.body
    if (partnerId) {
        try {
            let result = await processWithBackground(partnerId, ...promptGroup);
            res.send(result)
        } catch (e) {
            console.error(e)
            res.status(500).json({
                "message": e.message
            })
        }
    } else {
        res.status(400).json({
            "message": "Missing input: text"
        })
    }
}

export {
    router
}