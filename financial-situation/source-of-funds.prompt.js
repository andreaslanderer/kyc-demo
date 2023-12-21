const factListPrompt = `
**Instruction**:
- Examine the provided **background data**.
- Extract key facts about the individual mentioned, focusing on source of funds and assets
- Present these facts as a list in a JSON object.

**Example**:
Given the background: 
"Sarah holds a portfolio of stocks and obligations with a value of 350k CHF at UBS (opened 2010). 
In 2021, She has opened another equity portfolio with Morgan Stanley worth 500k USD She has 2 Mio. EUR in cash
with Deutsche Bank."

Your output might be:
\`\`\`
{{
    "facts": [
        "Since 2010, Sarah has a portfolio of stocks and obligations with a value of 350,000 CHF at UBS",
        "Since 2021, she has an equity portfolio with Morgan Stanley worth 500,000 USD",
        "She has 2,000,000 EUR in cash with Deutsche Bank"
    ]
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "facts": "The list of facts presented as short and concise statements"
}}

--- Begin Background ---

{background}

--- End Background --- 
\`\`\`
`

const sourceOfFundsPrompt = `
**Instruction**: 
- You will receive background data.
- Determine the **source of funds** of the person including: **Portfolios**, **Cash**, etc.
- Use the structure provided below for your response.
- **Avoid assumptions**. If certain details are absent, please leave them blank.

**Example**: 
If the background data says: 
"Sarah holds a portfolio of stocks and obligations with a value of 350k CHF at UBS (opened 2010). 
In 2021, She has opened another equity portfolio with Morgan Stanley worth 500k USD She has 2 Mio. EUR in cash
with Deutsche Bank."

Your output might be:
\`\`\`
{{
    "entries": [
        {{
            "type": "CASH",
            "amount": 2000000,
            "currency": "EUR",
            "year": "",
            "institution": "Deutsche Bank"
        }},
        {{
            "type": "PORTFOLIO",
            "amount": 350000,
            "currency": "CHF",
            "year": "2010",
            "institution": "UBS"
        }},
        {{
            "type": "PORTFOLIO",
            "amount": 500000,
            "currency": "USD",
            "year": "2021",
            "institution": "Morgan Stanley"
        }}
    ]
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "entries": [
        {{
            "type": "Source of funds type (one of: "CASH", "PORTFOLIO", "SALARY", "BONUS", "INVESTMENT_INCOME", "INHERITANCE", "GIFT", "SALE_OF_BUSINESS", "SALE_OF_PROPERTY", "SALE_OF_ASSETS", "PENSION", "UNKNOWN")",
            "amount": "Integer representing the value of the investment",
            "currency": "SO 4217 currency code (three-letter-code)",
            "year": "Year when the source of wealth was received" ,
            "institution": "Name of the financial institution"
        }}
    ]
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background --- 
`

export {
    factListPrompt,
    sourceOfFundsPrompt
}