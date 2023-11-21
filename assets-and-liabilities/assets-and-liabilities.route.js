import express from 'express'
import {prompt, promptWithBackground} from "../common/llm.js";
import {PromptTemplate} from "langchain/prompts";
import {liquidityPrompt} from "./assets-and-liabilities.prompt.js";

const router = express.Router()

const liquidity = {
    information: "liquidity",
    prompt: PromptTemplate.fromTemplate(liquidityPrompt),
    question: `Which liquid assets does the person possess?`,
    entries: 10
}

router.post('/assetsAndLiabilities/liquidity', async (req, res) => {
    await process(req, res, [liquidity], 'liquidity')
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