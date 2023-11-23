import {search} from "./vector-store.js";
import {COMPLETION_ENDPOINT} from "./endpoints.js";
import {post} from "./http-client.js";
import {correctnessPrompt} from "../family-situation/family-situation.prompt.js";

// Define a regular expression pattern to match JSON objects
const jsonRegEx = /{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/;

async function calculateScore(correctnessPrompt, text, result) {
    console.log(`Calculating correctness score`)
    const formattedPrompt = await correctnessPrompt.format({
        background: text,
        object: JSON.stringify(result)
    })
    console.log(formattedPrompt)
    const scoreObject = await getCompletion(formattedPrompt)
    console.log(JSON.stringify(scoreObject))
    console.log(`Successfully calculated correctness score`)
    const match = scoreObject.match(jsonRegEx);
    if (match && match.length > 0) {
        const parsedScoreObject = JSON.parse(match[0])
        result.value.score = parsedScoreObject.score
        result.value.missingData = parsedScoreObject.missingData
    } else {
        result.value.score = "NOT_COMPLETE"
        result.value.missingData = []
    }
}

async function prompt(text, res, promptGroupName, promptGroup, correctnessPrompt) {
    console.log(`Calling ${promptGroupName} endpoint`)

    try {
        const promises = promptGroup.map(async p => {
            const formattedPrompt = await p.prompt.format({
                background: text
            })
            const result = await callCompletion(p, formattedPrompt);
            await calculateScore(correctnessPrompt, text, result);
            return result
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

async function callCompletion(p, formattedPrompt) {
    console.log('Calling OpenAI service', p.information)
    const result = await getCompletion(formattedPrompt)
    console.log(`OpenAI service call returned successfully with result`, p.information)

    const match = result.match(jsonRegEx);
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

            const match = result.match(jsonRegEx);
            if (match && match.length > 0) {
                const returnObject = {
                    prop: p.information,
                    value: JSON.parse(match[0])
                }
                returnObject.value['background'] = background
                return returnObject
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
    const data = {
        "model": "gpt4_0613_8k",
        "prompt": prompt,
        "stop": [],
        "temperature": 0,
        "max_tokens": 4000
    }
    const response = await post(COMPLETION_ENDPOINT, data)
    return response.data.completion
}

export {
    prompt,
    promptWithBackground
}