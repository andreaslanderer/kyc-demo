import express from 'express'
import {PromptTemplate} from "langchain/prompts";

import {
    civilStatusPrompt,
    factListPrompt,
    noChildrenPrompt,
    personalDetailsPrompt,
    relationBetweenPartnersPrompt
} from "./family-situation.prompt.js";
import {cacheMiddleware} from "../common/caching.js";
import {
    process,
    processWithFacts
} from "../common/prompting.service.js";

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
const factList = {
    information: "facts",
    prompt: PromptTemplate.fromTemplate(factListPrompt)
};
const familySituationPrompts = [
    civilStatus,
    personalDetails,
    partnerRelations,
    noOfChildren
]

router.post('/familySituationNew', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, familySituationPrompts, 'familySituation')
})

router.post('/familySituation/civilStatus', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, [civilStatus], 'civilStatus')
})

router.post('/familySituation/personalDetails', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, [personalDetails], 'personalDetails')
})

router.post('/familySituation/partnerRelations', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, [partnerRelations], 'partnerRelations')
})

router.post('/familySituation/noOfChildren', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, [noOfChildren], 'noOfChildren')
})

router.post('/familySituation/facts', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, [noOfChildren], 'noOfChildren', false)
})

async function processRequest(req, res, promptGroup, loggingEndpointName, useFacts = true) {
    const { text } = req.body
    if (text) {
        try {
            let result = await (useFacts ? processWithFacts(text, promptGroup, factList, loggingEndpointName) : process(text, promptGroup, loggingEndpointName));
            res.send(result)
        } catch (e) {
            console.error(e)
            res.status(500).body(e)
        }
    } else {
        res.status(400).json({
            "message": "Missing input: text"
        })
    }
}

export { router }
