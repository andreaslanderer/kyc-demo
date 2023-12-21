const factListPrompt = `
**Instruction**:
- Examine the provided **background data**.
- Extract key facts about the individual mentioned, focusing on source of wealth and income
- Present these facts as a list in a JSON object.

**Example**:
Given the background: 
"Sarah's liquidity position is robust, evidenced by her substantial cash reserves of 500,000 CHF. She works an an
investment banker at UBS, where she earns 200k CHF per year. She also has a portfolio of stocks and obligations with 
a value of 350k USD. She inherited 1 million CHF from her father, who passed away in 2019."

Your output might be:
\`\`\`
{{
    "facts": [
        "Sarah works as an investment banker at UBS and earns 200,000 CHF per year",
        "She inherited 1,000,000 CHF from her father, who passed away in 2019",
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

const sourceOfWealthPrompt = `
**Instruction**: 
- You will receive background data.
- Determine the **source of wealth** of the person including: **Inheritances**, **Income**, **Capital Earnings**, etc.
- Use the structure provided below for your response.
- **Avoid assumptions**. If certain details are absent, please leave them blank.

**Example**: 
If the background data says: 
""Sarah's liquidity position is robust, evidenced by her substantial cash reserves of 500,000 CHF. She works an an
investment banker at UBS, where she earns 200k CHF per year. She also has a portfolio of stocks and obligations with 
a value of 350k USD. She inherited 1 million CHF from her father, who passed away in 2019. In addition, she has rental 
income of 100,000 EUR annually."

Your output might be:
\`\`\`
{{
    "entries": [
        {{
            "type": "SALARY",
            "amount": 200000,
            "currency": "CHF"
        }},
        {{
            "asset": "INHERITANCE",
            "amount": 1000000,
            "currency": "CHF"
        }},
        {{
            "asset": "INVESTMENT_INCOME",
            "amount": 100000,
            "currency": "EUR"
        }}
    ]
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "entries": [
        {{
            "type": "Source of wealth type (one of: "SALARY", "BONUS", "INVESTMENT_INCOME", "INHERITANCE", "GIFT", "SALE_OF_BUSINESS", "SALE_OF_PROPERTY", "SALE_OF_ASSETS", "PENSION", "UNKNOWN")",
            "amount": "Integer representing the value of the investment",
            "currency": "SO 4217 currency code (three-letter-code)"
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
    sourceOfWealthPrompt
}