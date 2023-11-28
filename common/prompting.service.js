import {prompt} from "./llm.js";
import {search} from "./vector-store.js";

async function processWithBackground(partnerId, { factPrompt, promptGroup = [] }) {
    const promises = promptGroup.map(async currentPrompt => {
        const background = await getBackground(partnerId, currentPrompt)
        const backgroundString = JSON.stringify(background)
        return await process(backgroundString, currentPrompt, factPrompt)
    })
    const resultsArray = await Promise.all(promises)
    const results = {}
    resultsArray.forEach((actualResult, index) => {
        const property = promptGroup[index].information
        results[property] = actualResult
    })
    return results
}

async function getBackground(partnerId, currentPrompt) {
    console.log(`Calling cognitive search.`, currentPrompt.information)
    const questionPromises = currentPrompt.questions.map(currentQuestion => {
        return getEmbeddings(currentQuestion, partnerId, currentPrompt.entries)
    })
    const results = await Promise.all(questionPromises)
    console.log(`Cognitive search returned successfully with background information.`, currentPrompt.information)
    return results.flat()
}

async function getEmbeddings(question, partnerId, entries) {
    const answerDocuments = await search(partnerId, question, entries)
    return answerDocuments.map(a => a.content)
        .reduce((acc, cv) => { return acc + '\n' + cv }, '')
}

async function process(text, currentPrompt, factPrompt=undefined) {
    if (factPrompt !== undefined) {
        const facts = await process(text, factPrompt)
        const factsString = JSON.stringify(facts["facts"])
        return await prompt(factsString, currentPrompt)
    }
    return await prompt(text, currentPrompt);
}

export {
    processWithBackground
}