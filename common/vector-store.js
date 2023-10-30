import axios from "axios";
async function search(partnerId, question, entries) {
    const response = await axios.post('https://bde-sn-pai-kyc-embedding-function-fapp.azurewebsites.net/api/documents/search/', {
        partner_id: partnerId,
        query: question,
        k: entries
    })
    return response.data.documents
}

export {
    search
}