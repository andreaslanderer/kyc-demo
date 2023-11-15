import express from 'express'
import cors from 'cors'
import { router as createEmbeddingsRouter } from './create-embeddings/create-embeddings.route.js'
import { router as familySituationRouter } from './family-situation/family-situation.route.js'
import { router as professionalBackgroundRouter } from './professional-background/professional-background.route.js'
import { router as sourceOfFundsRouter } from './source-of-funds/source-of-funds.route.js'
import {COMPLETION_ENDPOINT, EMBEDDING_ENDPOINT, SEARCH_ENDPOINT} from "./common/endpoints.js";

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(createEmbeddingsRouter)
app.use(familySituationRouter)
app.use(professionalBackgroundRouter)
app.use(sourceOfFundsRouter)



app.set('json spaces', 2)
app.options('*', cors())

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
    console.log(`Search Endpoint: ${SEARCH_ENDPOINT}`)
    console.log(`Embedding Endpoint: ${EMBEDDING_ENDPOINT}`)
    console.log(`Completion Endpoint: ${COMPLETION_ENDPOINT}`)
})