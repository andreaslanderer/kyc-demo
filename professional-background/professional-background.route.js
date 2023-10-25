import express from 'express'
import { prompt } from "../common/llm.js"
import {PromptTemplate} from "langchain/prompts"
import {
    educationPrompt,
    employmentPrompt,
    selfEmploymentPrompt,
    unemploymentPrompt
} from "./professional-background.prompt.js"

const router = express.Router()

const education = { information: "education", prompt: PromptTemplate.fromTemplate(educationPrompt) }
const employment = { information: "employment", prompt: PromptTemplate.fromTemplate(employmentPrompt) }
const selfEmployment = { information: "selfEmployment", prompt: PromptTemplate.fromTemplate(selfEmploymentPrompt) }
const unemployment = { information: "unemployment", prompt: PromptTemplate.fromTemplate(unemploymentPrompt) }
const professionalBackgroundPrompt = [
    education,
    employment,
    selfEmployment,
    unemployment,
]

router.post('/professionalBackground/professionalBackgroundNew', async (req, res) => {
    await prompt(req, res, 'education', professionalBackgroundPrompt);
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