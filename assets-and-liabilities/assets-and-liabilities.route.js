import express from 'express'
import {PromptTemplate} from "langchain/prompts";
import {liquidityAssetsPrompt, liquidityLiabilitiesPrompt} from "./assets-and-liabilities.prompt.js";
import {processWithBackground} from "../common/prompting.service.js";
import {processRequest} from "../common/rest-controller.utils.js";
//
const router = express.Router()

const liquidityAssets = {
    information: "assets",
    prompt: PromptTemplate.fromTemplate(liquidityAssetsPrompt),
    questions: [`Which liquid assets does the person possess?`],
    entries: 10
}

const liquidityLiabilities = {
    information: "liabilities",
    prompt: PromptTemplate.fromTemplate(liquidityLiabilitiesPrompt),
    questions: [`Which short-term liabilities does the person possess?`],
    entries: 10
}

router.post('/assetsAndLiabilities/liquidity', async (req, res) => {
    await processRequest(req, res, liquidityAssets, liquidityLiabilities)
})

export { router }