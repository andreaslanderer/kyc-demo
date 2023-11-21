
const liquidityPrompt = `
**Instruction**: 
- You will receive background data.
- Determine the **liquid assets** of the person including: **Cash**, **Money Market Instruments**, etc.
- Use the structure provided below for your response.
- **Avoid assumptions**. If certain details are absent, please leave them blank.

**Example**: 
If the background data says: 
"Sarah's liquidity position is robust, evidenced by her substantial cash reserves of 500,000 CHF. Additionally, she 
holds two specific a U.S. Treasury Bill valued at 200,000 USD and 
a Euro-denominated Commercial Paper worth 300,000 EUR."

Your output might be:
\`\`\`
{{
    "liquidity": [
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
    "liquidity": [
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

export {
    liquidityPrompt
}