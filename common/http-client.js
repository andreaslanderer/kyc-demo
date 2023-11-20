import axios from "axios";

async function post(endpoint, data) {
    const config = {
        headers: {
            "x-functions-key": process.env.FUNCTIONS_KEY
        }
    }
    return await axios.post(endpoint, data, config)
}

export {
    post
}