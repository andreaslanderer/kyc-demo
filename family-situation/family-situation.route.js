import express from 'express'
import {PromptTemplate} from "langchain/prompts";

import {prompt} from "../common/llm.js";
import {
    correctnessPrompt,
    civilStatusPrompt,
    noChildrenPrompt,
    personalDetailsPrompt,
    relationBetweenPartnersPrompt
} from "./family-situation.prompt.js";
import {cacheMiddleware} from "../common/caching.js";

const router = express.Router()

const civilStatus = {
    information: "civilStatus",
    prompt: PromptTemplate.fromTemplate(civilStatusPrompt)
};
const personalDetails = {
    information: "personalDetails",
    prompt: PromptTemplate.fromTemplate(personalDetailsPrompt)
};
const partnerRelations = {
    information: "partnerRelations",
    prompt: PromptTemplate.fromTemplate(relationBetweenPartnersPrompt)
};
const noOfChildren = {
    information: "noOfChildren",
    prompt: PromptTemplate.fromTemplate(noChildrenPrompt)
};
const familySituationPrompts = [
    civilStatus,
    personalDetails,
    partnerRelations,
    noOfChildren
]

router.post('/familySituationNew', cacheMiddleware(5), async (req, res) => {
    await process(req, res, 'familySituation', familySituationPrompts)
})

router.post('/familySituation/civilStatus', cacheMiddleware(5), async (req, res) => {
    await process(req, res, 'civilStatus', [civilStatus])
})

router.post('/familySituation/personalDetails', cacheMiddleware(5), async (req, res) => {
    await process(req, res, 'personalDetails', [personalDetails])
})

router.post('/familySituation/partnerRelations', cacheMiddleware(5), async (req, res) => {
    await process(req, res, 'partnerRelations', [partnerRelations])
})

router.post('/familySituation/noOfChildren', cacheMiddleware(5), async (req, res) => {
    await process(req, res, 'noOfChildren', [noOfChildren])
})

async function process(req, res, endpointName, promptGroup) {
    const {text} = req.body
    if (text) {
        await prompt(text, res, endpointName, promptGroup, PromptTemplate.fromTemplate(correctnessPrompt));
    } else {
        res.status(400).json({
            "message": "Missing property: text"
        })
    }
}

export { router }
