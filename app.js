import express from 'express'
import cors from 'cors'
import {PromptTemplate} from 'langchain/prompts'
import {prompt} from "./common/llm.js"
import {
    educationPrompt,
    employmentPrompt,
    selfEmploymentPrompt,
    unemploymentPrompt
} from './prompt.js'
import { router as familySituationRouter } from './family-situation/family-situation.route.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(familySituationRouter)

app.set('json spaces', 2)
app.options('*', cors())

const educationalBackgroundPrompt = [
    { information: "education", prompt: PromptTemplate.fromTemplate(educationPrompt) }
]

const employmentBackgroundPrompt = [
    { information: "employment", prompt: PromptTemplate.fromTemplate(employmentPrompt) },
    { information: "unemployment", prompt: PromptTemplate.fromTemplate(unemploymentPrompt) },
    { information: "selfEmployment", prompt: PromptTemplate.fromTemplate(selfEmploymentPrompt) },
]

app.post('/educationalBackgroundNew', async (req, res) => {
    await prompt(req, res, 'educationalBackground', educationalBackgroundPrompt);
})

app.post('/employmentBackgroundNew', async (req, res) => {
    await prompt(req, res, 'employmentBackground', employmentBackgroundPrompt);
})

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})