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

async function processRequest(req, res, promptGroup, loggingEndpointName) {
    console.log(`Calling REST endpoint.`, loggingEndpointName)
    const { text } = req.body
    if (text) {
        try {
            let result = processWithFacts(text, factList, ...promptGroup);
            console.log(`Successfully called REST endpoint.`, loggingEndpointName)
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

export { router }
