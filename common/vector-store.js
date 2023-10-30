import axios from "axios";
async function search(partnerId, question, entries) {
    const response = await axios.post(process.env.SEARCH_ENDPOINT, {
        partner_id: partnerId,
        query: question,
        k: entries
    })
    return response.data.documents
}

export {
    search
}