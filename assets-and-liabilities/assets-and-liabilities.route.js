import express from 'express'
import {promptWithBackground} from "../common/llm.js";
import {PromptTemplate} from "langchain/prompts";
import {liquidityAssetsPrompt, liquidityLiabilitiesPrompt} from "./assets-and-liabilities.prompt.js";

const router = express.Router()

const liquidityAssets = {
    information: "assets",
    prompt: PromptTemplate.fromTemplate(liquidityAssetsPrompt),
    question: `Which liquid assets does the person possess?`,
    entries: 10
}

const liquidityLiabilities = {
    information: "liabilities",
    prompt: PromptTemplate.fromTemplate(liquidityLiabilitiesPrompt),
    question: `Which short-term liabilities does the person possess?`,
    entries: 10
}

router.post('/assetsAndLiabilities/liquidity', async (req, res) => {
    await process(req, res, [liquidityAssets, liquidityLiabilities], 'liquidity')
})

async function process(req, res, promptGroup, endpointName) {
    const {partnerId} = req.body
    if (partnerId) {
        await promptWithBackground(partnerId, res, endpointName, promptGroup)
    } else {
        res.status(400).json({
            "message": "Missing property: partnerId"
        })
    }
}

export { router }