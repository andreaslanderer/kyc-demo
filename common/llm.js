import {COMPLETION_ENDPOINT} from "./endpoints.js";
import {post} from "./http-client.js";

// Define a regular expression pattern to match JSON objects
const jsonRegEx = /{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/;


/**
 * This function calls the OpenAI chat completion endpoint. If the call was successful, it returns the
 * result object. Otherwise, it will throw an exception that needs to be handled by the client.
 *
 * @param text The text to be inserted into the prompt
 * @param currentPrompt The prompt to be executed
 * @returns {Promise<{}>}  The promise containing the result object
 */
async function prompt(text, currentPrompt) {
    const formattedPrompt = await currentPrompt.prompt.format({
        background: text
    })
    console.log('Calling OpenAI service.', currentPrompt.information)
    const result = await getCompletion(formattedPrompt)
    console.log(`OpenAI service call returned successfully with result.`, currentPrompt.information)

    const match = result.match(jsonRegEx);
    if (match && match.length > 0) {
        const resultObject = JSON.parse(match[0])
        resultObject["background"] = text
        return resultObject
    } else {
        console.log('No response JSON found, therefore returning an empty object.', currentPrompt.information)
        return { }
    }
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
    prompt
}