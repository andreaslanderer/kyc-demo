import express from 'express'
import cors from 'cors'
import { router as familySituationRouter } from './family-situation/family-situation.route.js'
import { router as professionalBackgroundRouter } from './professional-background/professional-background.route.js'
import {prompt} from "./common/llm.js";

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(familySituationRouter)
app.use(professionalBackgroundRouter)

app.set('json spaces', 2)
app.options('*', cors())

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})