import express from 'express'
import {PromptTemplate} from "langchain/prompts";
import {
    factListPrompt,
    liquidityAssetsPrompt,
    liquidityLiabilitiesPrompt
} from "./assets-and-liabilities.prompt.js";
import {processRequest} from "../common/rest-controller.utils.js";
//
const router = express.Router()

const liquidityAssets = {
    information: "assets",
    prompt: PromptTemplate.fromTemplate(liquidityAssetsPrompt),
    questions: [
        `Which liquid assets does the person possess?`,
        `Which money market instruments does the person possess?`,
        `Which short-term assets is he invested in?`
    ],
    entries: 5
}

const liquidityLiabilities = {
    information: "liabilities",
    prompt: PromptTemplate.fromTemplate(liquidityLiabilitiesPrompt),
    questions: [
        `Which short-term liabilities does the person possess?`,
        `What short-term loans does person have?`,
        `What short-term credit does the person have?`
    ],
    entries: 5
}

const factList = {
    information: "facts",
    prompt: PromptTemplate.fromTemplate(factListPrompt)
};

router.post('/assetsAndLiabilities/liquidity', async (req, res) => {
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: [liquidityAssets, liquidityLiabilities]
    })
})

export { router }