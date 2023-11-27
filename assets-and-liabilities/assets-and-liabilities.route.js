import express from 'express'
import {PromptTemplate} from "langchain/prompts";
import {
    factListPrompt,
    liquidityAssetsPrompt,
    liquidityLiabilitiesPrompt,
    securityAssetsPrompt,
    securityLiabilitiesPrompt
} from "./assets-and-liabilities.prompt.js";
import {processRequest} from "../common/rest-controller.utils.js";
//
const router = express.Router()

const liquidityAssets = {
    information: "liquidityAssets",
    prompt: PromptTemplate.fromTemplate(liquidityAssetsPrompt),
    questions: [
        `What liquid assets does the person possess?`,
        `Which money market instruments does the person possess?`,
        `Which short-term assets is he invested in?`
    ],
    entries: 5
}

const liquidityLiabilities = {
    information: "liquidityLiabilities",
    prompt: PromptTemplate.fromTemplate(liquidityLiabilitiesPrompt),
    questions: [
        `What short-term liabilities does the person possess?`,
        `What short-term loans does person have?`,
        `What short-term credit does the person have?`
    ],
    entries: 5
}

const securityAssets = {
    information: "securityAssets",
    prompt: PromptTemplate.fromTemplate(securityAssetsPrompt),
    questions: [
        `What portfolios does the person have?`,
        `What advisory mandates does person have?`,
        `What discretionary mandates does the person have?`
    ],
    entries: 5
}

const securityLiabilities = {
    information: "securityLiabilities",
    prompt: PromptTemplate.fromTemplate(securityLiabilitiesPrompt),
    questions: [
        `What mid-term or long-term credits the person have?`,
        `What mid-term or long-term credits the person have`,
        `What mortgages does the person have?`
    ],
    entries: 5
}

const factList = {
    information: "facts",
    prompt: PromptTemplate.fromTemplate(factListPrompt)
};

router.post('/assetsAndLiabilitiesNew', async (req, res) => {
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: [liquidityAssets, liquidityLiabilities, securityAssets, securityLiabilities]
    })
})

router.post('/assetsAndLiabilities/liquidity', async (req, res) => {
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: [liquidityAssets, liquidityLiabilities]
    })
})

router.post('/assetsAndLiabilities/securities', async (req, res) => {
    await processRequest(req, res, {
        factPrompt: factList,
        promptGroup: [securityAssets, securityLiabilities]
    })
})

export { router }