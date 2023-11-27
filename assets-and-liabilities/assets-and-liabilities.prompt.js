const factListPrompt = `
**Instruction**:
- Examine the provided **background data**.
- Extract key facts about the individual mentioned, focusing on investments, assets, liabilities, loans, and credits
- Present these facts as a list in a JSON object.

**Example**:
Given the background: 
"Sarah's liquidity position is robust, evidenced by her substantial cash reserves of 500,000 CHF. Additionally, she 
holds two specific U.S. Treasury Bill valued at 200,000 USD and a Euro-denominated Commercial Paper worth 300,000 EUR.
Her liabilities include payday loans up to 200'000 CHF. In addition to that, she also has a long-running Lombard Loan
with Deutsche Bank totalling 500k EUR."
Your output might be:
\`\`\`
{{
    "facts": [
        "Sarah has cash reserves of 500'000 CHF",
        "She holds two Treasury Bill valued at 200,000 USD",
        "She holds a Euro-denominated Commercial Paper worth 300,000 EUR",
        "She has payday loans up to 200'000 CHF",
        "She has a long-running Lombard Loan with Deutsche Bank totalling 500k EUR."
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

const liquidityAssetsPrompt = `
**Instruction**: 
- You will receive background data.
- Determine the **liquid assets** of the person including: **Cash**, **Money Market Instruments**, etc.
- Use the structure provided below for your response.
- **Avoid assumptions**. If certain details are absent, please leave them blank.

**Example**: 
If the background data says: 
"Sarah's liquidity position is robust, evidenced by her substantial cash reserves of 500,000 CHF. Additionally, she 
holds two specific a U.S. Treasury Bill valued at 200,000 USD and a Euro-denominated Commercial Paper worth 300,000 EUR.
There is also a portfolio holding stocks and obligations with a value of 350k USD."

Your output might be:
\`\`\`
{{
    "assetEntries": [
        {{
            "asset": "Cash",
            "amount": 500000,
            "currency": "CHF"
        }},
        {{
            "asset": "U.S. Treasury Bill",
            "amount": 200000,
            "currency": "USD"
        }},
        {{
            "asset": "Euro-denominated Commercial Paper",
            "amount": 300000,
            "currency": "EUR"
        }}
    ]
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "assetEntries": [
        {{
            "asset": "Name of the money-market asset",
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

const liquidityLiabilitiesPrompt = `
**Instruction**: 
- You will receive background data.
- Determine the **short-term liabilities** of the person including: **Short-Term Loans**, **Accrued Expenses**, etc.
- Consider liabilities with a maturity of up to one year
- Use the structure provided below for your response.
- **Avoid assumptions**. If certain details are absent, please leave them blank.

**Example**: 
If the background data says: 
"Sarah's liabilities include payday loans up to 200'000 CHF. In addition to that, she also has a long-running Lombard Loan
with Deutsche Bank totalling 500k EUR."

Your output might be:
\`\`\`
{{
    "liabilityEntries": [
        {{
            "asset": "Payday Loan",
            "amount": 200000,
            "currency": "CHF"
        }}
    ]
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "liabilityEntries": [
        {{
            "asset": "Name of the short-term liability",
            "amount": "Integer representing the value of the liability",
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
    liquidityAssetsPrompt,
    liquidityLiabilitiesPrompt
}