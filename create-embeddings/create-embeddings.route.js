import express from "express";
import {EMBEDDING_ENDPOINT} from "../common/endpoints.js";
import {post} from "../common/http-client.js";

const router = express.Router()

router.post('/embeddings/createEmbeddings', async (req, res) => {
    console.log(`Calling create embeddings endpoint`)
    const { partnerId, documentId, text } = req.body
    const result = await post(EMBEDDING_ENDPOINT, {
        "partner_id": partnerId,
        "document_id": documentId,
        "text": text
    })
    console.log(`Embeddings result: Status=${result.status}, Data=${result.data}`)
    console.log(`Successfully called create embeddings endpoint`)
    res.send()
})

export { router }