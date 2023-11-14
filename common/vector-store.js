import axios from "axios";
import {SEARCH_ENDPOINT} from "./endpoints.js";
async function search(partnerId, question, entries) {
    const response = await axios.post(SEARCH_ENDPOINT, {
        partner_id: partnerId,
        query: question,
        k: entries
    })
    return response.data.documents
}

export {
    search
}