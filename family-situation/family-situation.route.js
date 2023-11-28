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
    prompt: PromptTemplate.fromTemplate(civilStatusPrompt),
    questions: [
        `What is the civil status of the person?`,
        `Is the person married?`,
        `Is the person widowed?`
    ],
    entries: 5
};
const personalDetails = {
    information: "personalDetails",
    prompt: PromptTemplate.fromTemplate(personalDetailsPrompt),
    questions: [
        `What is the name of the person?`,
        `When was the person born?`,
        `Where does the person live?`,
        `What is the nationality of the person?`
    ],
    entries: 5
};
const partnerRelations = {
    information: "partnerRelations",
    prompt: PromptTemplate.fromTemplate(relationBetweenPartnersPrompt),
    questions: [
        `Who is part of the person's family`,
        `Who is is the person related to?`,
        `Does the person have children?`
    ],
    entries: 5
};
const noOfChildren = {
    information: "noOfChildren",
    prompt: PromptTemplate.fromTemplate(noChildrenPrompt),
    questions: [
        `Who are the person's children?`,
        `Does the person have sons?`,
        `Does the person have daughters?`
    ],
    entries: 5
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