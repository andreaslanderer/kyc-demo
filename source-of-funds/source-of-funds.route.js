import express from 'express';
import { PromptTemplate } from "langchain/prompts";
import { prompt } from "../common/llm.js";
import { sourceOfFundsPrompt } from "./source-of-funds.prompt.js";
import { cacheMiddleware } from "../common/caching.js";

const router = express.Router();

const sourceOfFunds = {
    information: "sourceOfFunds",
    prompt: PromptTemplate.fromTemplate(sourceOfFundsPrompt)
};

router.post('/sourceOfFundsNew', cacheMiddleware(5), async (req, res) => {
    console.log("Request received on /sourceOfFundsNew");
    console.log("Received text for processing:", req.body.text);
    console.log("Using prompt:", sourceOfFundsPrompt);
    await process(req, res, 'sourceOfFunds', [sourceOfFunds])
});

async function process(req, res, endpointName, promptGroup) {
    console.log("Process function called with text:", req.body.text);
    const { text } = req.body;
    if (text) {
        console.log("Processing with prompt:", promptGroup[0].prompt.template);
        await prompt(text, res);
    } else {
        res.status(400).json({ "message": "Missing property: text" });
    }
}

export { router };
