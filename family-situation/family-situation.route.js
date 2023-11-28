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
        `What is the civil status of {{fullName}}?`,
        `Is {{fullName}} married?`,
        `Is {{fullName}} widowed?`
    ],
    entries: 5
};
const personalDetails = {
    information: "personalDetails",
    prompt: PromptTemplate.fromTemplate(personalDetailsPrompt),
    questions: [
        `What is the name of {{fullName}}?`,
        `When was {{fullName}} born?`,
        `Where does {{fullName}} live?`,
        `What is the nationality of {{fullName}}?`
    ],
    entries: 5
};
const partnerRelations = {
    information: "partnerRelations",
    prompt: PromptTemplate.fromTemplate(relationBetweenPartnersPrompt),
    questions: [
        `Who is part of {{fullName}}'s family`,
        `Who is is {{fullName}} related to?`,
        `Does {{fullName}} have children?`
    ],
    entries: 5
};
const noOfChildren = {
    information: "noOfChildren",
    prompt: PromptTemplate.fromTemplate(noChildrenPrompt),
    questions: [
        `Who are {{fullName}}'s children?`,
        `Does {{fullName}} have sons?`,
        `Does {{fullName}} have daughters?`
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
    const { firstName, lastName } = req.body
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: preProcessPrompts(familySituationPrompts, firstName, lastName)
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

function preProcessPrompts(promptGroup, firstName, lastName) {
    return promptGroup.map(promptTemplate => {
        promptTemplate.questions = promptTemplate.questions.map(question => {
            const fullName = `${firstName} ${lastName}`
            return question.replace(/{{fullName}}/g, fullName)
        })
        return promptTemplate
    })
}

export { router }