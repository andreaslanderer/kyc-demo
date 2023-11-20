import express from 'express';
import { PromptTemplate } from "langchain/prompts";
import { prompt } from "../common/llm.js";
import {
    incomeMiscellaneousPrompt,
    incomeFromBusinessActivitiesPrompt,
    incomeFromRealEstateSalesPrompt,
    incomeFromInheritancePrompt,
    incomeFromSalesInterestPrompt
} from "./source-of-funds.prompt.js";
import { cacheMiddleware } from "../common/caching.js";

const router = express.Router();

// Prompt-Objekte
const incomeMiscellaneous = {
    information: "incomeMiscellaneous",
    prompt: PromptTemplate.fromTemplate(incomeMiscellaneousPrompt)
};
const incomeFromBusinessActivities = {
    information: "incomeFromBusinessActivities",
    prompt: PromptTemplate.fromTemplate(incomeFromBusinessActivitiesPrompt)
};
const incomeFromRealEstateSales = {
    information: "incomeFromRealEstateSales",
    prompt: PromptTemplate.fromTemplate(incomeFromRealEstateSalesPrompt)
};
const incomeFromInheritance = {
    information: "incomeFromInheritance",
    prompt: PromptTemplate.fromTemplate(incomeFromInheritancePrompt)
};
const incomeFromSalesInterest = {
    information: "incomeFromSalesInterest",
    prompt: PromptTemplate.fromTemplate(incomeFromSalesInterestPrompt)
};

// Route-Definitionen
router.post('/incomeMiscellaneous', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, 'sourceOfFunds', [incomeMiscellaneous]);
});

router.post('/incomeFromBusinessActivities', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, 'incomeFromBusinessActivities', [incomeFromBusinessActivities]);
});

router.post('/incomeFromRealEstateSales', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, 'incomeFromRealEstateSales', [incomeFromRealEstateSales]);
});

router.post('/incomeFromInheritance', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, 'incomeFromInheritance', [incomeFromInheritance]);
});

router.post('/incomeFromSalesInterest', cacheMiddleware(5), async (req, res) => {
    await processRequest(req, res, 'incomeFromSalesInterest', [incomeFromSalesInterest]);
});

// Prozessfunktion
async function processRequest(req, res, endpointName, promptGroup) {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ "message": "Missing property: text" });
    }

    console.log(`Processing request on '${endpointName}' with text:`, text);
    try {
        const response = await prompt(text, res, endpointName, promptGroup);
        console.log(`Response from '${endpointName}' prompt:`, response);
        res.json(response);
    } catch (error) {
        console.error(`Error during processing '${endpointName}':`, error);
        res.status(500).json({ error: `Error processing request: ${error.message}` });
    }
}

export { router };
