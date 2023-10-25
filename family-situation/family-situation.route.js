
import express from 'express'
import {PromptTemplate} from "langchain/prompts";

import { prompt } from "../common/llm.js";
import {
    civilStatusPrompt,
    noChildrenPrompt,
    personalDetailsPrompt,
    relationBetweenPartnersPrompt
} from "./family-situation.prompt.js";

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

router.post('/familySituationNew', async (req, res) => {
    await prompt(req, res, 'familySituation', familySituationPrompts);
})

router.post('/familySituation/civilStatus', async (req, res) => {
    await prompt(req, res, 'civilStatus', [civilStatus]);
})

router.post('/familySituation/personalDetails', async (req, res) => {
    await prompt(req, res, 'personalDetails', [personalDetails]);
})

router.post('/familySituation/partnerRelations', async (req, res) => {
    await prompt(req, res, 'partnerRelations', [partnerRelations]);
})

router.post('/familySituation/noOfChildren', async (req, res) => {
    await prompt(req, res, 'noOfChildren', [noOfChildren]);
})

export { router }
