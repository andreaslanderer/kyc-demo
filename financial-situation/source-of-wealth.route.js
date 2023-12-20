import express from 'express'
import {PromptTemplate} from "langchain/prompts";
import {factListPrompt, sourceOfWealthPrompt} from "./source-of-wealth.prompt.js";
import {processRequest} from "../common/rest-controller.utils.js";
//
const router = express.Router()

const sourceOfWealth = {
    information: "sourceOfWealth",
    prompt: PromptTemplate.fromTemplate(sourceOfWealthPrompt),
    questions: [
        `What is the income?`,
        `What are the capital earnings?`,
        `What has the person inherited?`
    ],
    entries: 5
}

const factList = {
    information: "facts",
    prompt: PromptTemplate.fromTemplate(factListPrompt)
};

router.post('/sourceOfWealthNew', async (req, res) => {
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: [sourceOfWealth]
    })
})

export { router }