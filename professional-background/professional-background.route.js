import express from 'express'
import {prompt, promptWithBackground} from "../common/llm.js"
import {PromptTemplate} from "langchain/prompts"
import {
    educationPrompt,
    employmentPrompt,
    selfEmploymentPrompt,
    unemploymentPrompt
} from "./professional-background.prompt.js"

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
const professionalBackgroundPrompt = [
    education,
    employment,
    selfEmployment,
    unemployment,
]

router.post('/professionalBackground/professionalBackgroundNew', async (req, res) => {
    const { partnerId } = req.body
    if (partnerId) {
        await promptWithBackground(partnerId, res, 'education', [education, employment, selfEmployment, unemployment]);
    } else {
        res.status(400).json({
            "message": "Missing property: partnerId"
        })
    }
})

router.post('/professionalBackground/education', async (req, res) => {
    await prompt(req, res, 'education', [education]);
})

router.post('/professionalBackground/employment', async (req, res) => {
    await prompt(req, res, 'employment', [employment]);
})

router.post('/professionalBackground/unemployment', async (req, res) => {
    await prompt(req, res, 'unemployment', [unemployment]);
})

router.post('/professionalBackground/selfEmployment', async (req, res) => {
    await prompt(req, res, 'selfEmployment', [selfEmployment]);
})

export {
    router
}