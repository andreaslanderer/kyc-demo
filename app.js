import express from 'express'
import cors from 'cors'
import { OpenAI } from 'langchain/llms/openai'
import {PromptTemplate} from 'langchain/prompts';
import {
    civilStatusPrompt,
    personalDetailsPrompt,
    relationBetweenPartnersPrompt,
    systemPrompt
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

const prompts = [
    { information: "personalDetails", prompt: PromptTemplate.fromTemplate(personalDetailsPrompt) },
    { information: "civilStatus", prompt: PromptTemplate.fromTemplate(civilStatusPrompt) },
    { information: "partnerRelations", prompt: PromptTemplate.fromTemplate(relationBetweenPartnersPrompt) }
]

app.post('/familySituation', (req, res) => {
    console.log('Calling familySituation endpoint')
    const { text } = req.body
    if (text) {
        try {
            const prompt = PromptTemplate.fromTemplate(systemPrompt)
            prompt.format({ text }).then(formattedPrompt => {
                console.log('Calling OpenAI service', formattedPrompt)
                getKyc(formattedPrompt).then(result => {
                    console.log(`OpenAI service call returned successfully with result`)
                    const match = result.match(jsonPattern);
                    if (match && match.length > 0) {
                        res.send(JSON.parse(match[0]))
                    } else {
                        console.log('No response JSON found, therefore returning an empty object')
                        res.send({})
                    }
                }, error => {
                    console.error(error)
                    res.status(500).send(error)
                })
            })
        } catch (e) {
            console.error(`Error while calling familySituation endpoint`, e)
            res.status(500).send(e)
        }
    } else {
        res.status(400).json({
            message: 'Missing required property: text'
        })
    }
})

async function getKyc(prompt) {
    const llm = new OpenAI({
        modelName: 'gpt-4',
        temperature: 0.0,
        openAIApiKey: apiKeyOpenAI
    })
    return await llm.predict(prompt);
}

app.post('/familySituationNew', async (req, res) => {
    console.log('Calling familySituation endpoint')
    const { text } = req.body

    try {
        const promises = prompts.map(async p => {
            const formattedPrompt = await p.prompt.format({
                familySituationOfTheClient: text
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

        console.log('Finished calling familySituation endpoint')
        res.send(results)
    } catch (e) {
        console.error(`Error while calling familySituation endpoint`, e)
        res.status(500).send(e)
    }
})

async function getCompletion(prompt) {
    const llm = new OpenAI({
        modelName: 'gpt-3.5-turbo-16k-0613',
        temperature: 0.0,
        openAIApiKey: apiKeyOpenAI
    });
    return await llm.predict(prompt);
}

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})