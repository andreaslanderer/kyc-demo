import express from 'express'
import {PromptTemplate} from "langchain/prompts";
import {factListPrompt, sourceOfFundsPrompt} from "./source-of-funds.prompt.js";
import {processRequest} from "../common/rest-controller.utils.js";
//
const router = express.Router()

const sourceOfWealth = {
    information: "sourceOfFunds",
    prompt: PromptTemplate.fromTemplate(sourceOfFundsPrompt),
    questions: [
        `What portfolio does the person have?`,
        `What savings does the person have?`,
        `What is the income?`,
        `What are the capital earnings?`,
        `What has the person inherited?`
    ],
    entries: 4
}

const factList = {
    information: "facts",
    prompt: PromptTemplate.fromTemplate(factListPrompt)
};

router.post('/sourceOfFundsNew', async (req, res) => {
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: [sourceOfWealth]
    })
})

export { router }