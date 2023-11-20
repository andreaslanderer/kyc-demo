import axios from "axios";
import {SEARCH_ENDPOINT} from "./endpoints.js";

async function post(endpoint, data) {
    const config = {
        headers: {
            "x-functions-key": process.env.FUNCTIONS_KEY
        }
    }
    await axios.post(SEARCH_ENDPOINT, data, config)
}

export {
    post
}