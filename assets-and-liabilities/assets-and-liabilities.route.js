import express from 'express'
import {prompt} from "../common/llm.js";
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
    const {text} = req.body
    if (text) {
        await prompt(text, res, endpointName, promptGroup)
    } else {
        res.status(400).json({
            "message": "Missing property: text"
        })
    }
}

export { router }