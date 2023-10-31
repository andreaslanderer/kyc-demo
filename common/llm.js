import {OpenAI} from "langchain/llms/openai";
import {search} from "./vector-store.js";

const apiKeyOpenAI = process.env.OPENAI_API_KEY

const llm = new OpenAI({
    // modelName: 'gpt-3.5-turbo-16k-0613',
    modelName: 'gpt-4',
    temperature: 0,
    openAIApiKey: apiKeyOpenAI
});

// Define a regular expression pattern to match JSON objects
const jsonPattern = /{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/;


async function prompt(text, res, promptGroupName, promptGroup) {
    console.log(`Calling ${promptGroupName} endpoint`)

    try {
        const promises = promptGroup.map(async p => {
            const formattedPrompt = await p.prompt.format({
                background: text
            })
            console.log('Calling OpenAI service', p.information)
            const result = await getCompletion(formattedPrompt)
            console.log(`OpenAI service call returned successfully with result`, p.information)

            const match = result.match(jsonPattern);
            if (match && match.length > 0) {
                return {
                    prop: p.information,
                    value: JSON.parse(match[0])
                }
            } else {
                console.log('No response JSON found, therefore returning an empty object', p.information)
                return {
                    prop: p.information,
                    value: {}
                }
            }
        })

        const resultsArray = await Promise.all(promises)
        const results = {}
        resultsArray.forEach(r => results[r.prop] = r.value)

        console.log(`Finished calling ${promptGroupName} endpoint`)
        res.send(results)
    } catch (e) {
        console.error(`Error while calling ${promptGroupName} endpoint`, e)
        res.status(500).send(e)
    }
}

async function promptWithBackground(partnerId, res, promptGroupName, promptGroup) {
    try {
        const promises = promptGroup.map(async p => {

            console.log(`Calling cognitive search`, p.information)
            const background = await getBackground(partnerId, p.question, p.entries);
            console.log(`Cognitive search returned successfully with background information`, p.information)

            const formattedPrompt = await p.prompt.format({
                background
            })
            console.log('Calling OpenAI service', p.information)
            const result = await getCompletion(formattedPrompt)
            console.log(`OpenAI service call returned successfully with result`, p.information)

            const match = result.match(jsonPattern);
            if (match && match.length > 0) {
                return {
                    prop: p.information,
                    value: JSON.parse(match[0])
                }
            } else {
                console.log('No response JSON found, therefore returning an empty object', p.information)
                return {
                    prop: p.information,
                    value: {}
                }
            }
        })

        const resultsArray = await Promise.all(promises)
        const results = {}
        resultsArray.forEach(r => results[r.prop] = r.value)

        console.log(`Finished calling ${promptGroupName} endpoint`)
        res.send(results)
    } catch (e) {
        console.error(`Error while calling ${promptGroupName} endpoint`, e)
        res.status(500).send(e)
    }
}

async function getBackground(partnerId, question, entries) {
    const documents = await search(partnerId, question, entries)
    return documents
        .map(d => d.content)
        .reduce((accumulator, currentValue) => `${currentValue}${accumulator}\n`, '')
}

async function getCompletion(prompt) {
    return await llm.predict(prompt);
}

export {
    prompt,
    promptWithBackground
}