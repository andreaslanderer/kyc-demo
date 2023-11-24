import {prompt} from "./llm.js";

async function processWithFacts(text, promptGroup, factPrompt, loggingEndpointName) {
    const { facts } = await process(text, [factPrompt], 'facts')
    const factsString = JSON.stringify(facts)
    console.log(`Proceeding with following facts:`, factsString)
    return await process(factsString, promptGroup, loggingEndpointName)
}

async function process(text, promptGroup, loggingEndpointName) {
    return await prompt(text, promptGroup, loggingEndpointName);
}

export {
    process,
    processWithFacts
}