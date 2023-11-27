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
import {processRequest} from "../common/rest-controller.utils.js";

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
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: familySituationPrompts
    })
})

router.post('/familySituation/civilStatus', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: [civilStatus]
    })
})

router.post('/familySituation/personalDetails', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: [personalDetails]
    })
})

router.post('/familySituation/partnerRelations', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: [partnerRelations]
    })
})

router.post('/familySituation/noOfChildren', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: [noOfChildren]
    })
})

export { router }