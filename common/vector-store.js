import {SEARCH_ENDPOINT} from "./endpoints.js";
import {post} from "./http-client.js";
async function search(partnerId, question, entries) {
    const data = {
        partner_id: partnerId,
        query: question,
        k: entries
    }
    const response = await post(SEARCH_ENDPOINT, data)
    return response.data.documents
}

export {
    search
}