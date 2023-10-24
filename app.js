import express from 'express'
import cors from 'cors'
import {OpenAI} from 'langchain/llms/openai'
import {PromptTemplate} from 'langchain/prompts';
import {
    civilStatusPrompt,
    educationPrompt,
    employmentPrompt,
    personalDetailsPrompt,
    relationBetweenPartnersPrompt, selfEmploymentPrompt,
    unemploymentPrompt
} from './prompt.js'

const app = express()
const port = process.env.PORT || 3000
const apiKeyOpenAI = process.env.OPENAI_API_KEY

// Define a regular expression pattern to match JSON objects
const jsonPattern = /{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/;

app.use(express.json())
app.use(cors())

app.set('json spaces', 2)
app.options('*', cors())

const familySituationPrompts = [
    { information: "personalDetails", prompt: PromptTemplate.fromTemplate(personalDetailsPrompt) },
    { information: "civilStatus", prompt: PromptTemplate.fromTemplate(civilStatusPrompt) },
    { information: "partnerRelations", prompt: PromptTemplate.fromTemplate(relationBetweenPartnersPrompt) }
]

const educationalBackgroundPrompt = [
    { information: "education", prompt: PromptTemplate.fromTemplate(educationPrompt) }
]

const employmentBackgroundPrompt = [
    { information: "employment", prompt: PromptTemplate.fromTemplate(employmentPrompt) },
    { information: "unemployment", prompt: PromptTemplate.fromTemplate(unemploymentPrompt) },
    { information: "selfEmployment", prompt: PromptTemplate.fromTemplate(selfEmploymentPrompt) },
]

app.post('/familySituationNew', async (req, res) => {
    await prompt(req, res, 'familySituation', familySituationPrompts);
})

app.post('/educationalBackgroundNew', async (req, res) => {
    await prompt(req, res, 'educationalBackground', educationalBackgroundPrompt);
})

app.post('/employmentBackgroundNew', async (req, res) => {
    await prompt(req, res, 'employmentBackground', employmentBackgroundPrompt);
})

async function prompt(req, res, promptGroupName, promptGroup) {
    console.log(`Calling ${promptGroupName} endpoint`)
    const {text} = req.body

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


async function getCompletion(prompt) {
    const llm = new OpenAI({
        // modelName: 'gpt-3.5-turbo-16k-0613',
        modelName: 'gpt-4',
        temperature: 0,
        openAIApiKey: apiKeyOpenAI
    });
    return await llm.predict(prompt);
}

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})