
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
"Sarah's liabilities include payday loans up to 200'000 CHF. In addition to that, she also has a running Lombard Loan
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
    liquidityAssetsPrompt,
    liquidityLiabilitiesPrompt
}