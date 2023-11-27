import {processWithBackground} from "./prompting.service.js";

async function processRequest(req, res, { factPrompt = undefined, promptGroup=[] }) {
    const { partnerId } = req.body
    if (partnerId) {
        try {
            let result = await processWithBackground(partnerId, { factPrompt, promptGroup });
            res.send(result)
        } catch (e) {
            console.error(e)
            res.status(500).json({
                "message": e.message
            })
        }
    } else {
        res.status(400).json({
            "message": "Missing input: text"
        })
    }
}

export {
    processRequest
}