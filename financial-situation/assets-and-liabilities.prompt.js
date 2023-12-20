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
"Sarah's liquidity position with UBS is robust, evidenced by her substantial cash reserves of 500,000 CHF. Additionally, she 
holds two specific a U.S. Treasury Bill valued at 200,000 USD and a Euro-denominated Commercial Paper worth 300,000 EUR.
There is also a portfolio holding stocks and obligations with a value of 350k USD."

Your output might be:
\`\`\`
{{
    "entries": [
        {{
            "asset": "Cash",
            "amount": 500000,
            "currency": "CHF",
            "financialInstitution": "UBS"
        }},
        {{
            "asset": "U.S. Treasury Bill",
            "amount": 200000,
            "currency": "USD",
            "financialInstitution": ""
        }},
        {{
            "asset": "Euro-denominated Commercial Paper",
            "amount": 300000,
            "currency": "EUR",
            "financialInstitution": ""
        }}
    ]
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "entries": [
        {{
            "asset": "Name of the money-market asset",
            "amount": "Integer representing the value of the investment",
            "currency": "SO 4217 currency code (three-letter-code)",
            "financialInstitution": "Name of the financial institution"
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
    "entries": [
        {{
            "asset": "Payday Loan",
            "amount": 200000,
            "currency": "CHF",
            "financialInstitution": ""
        }}
    ]
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "entries": [
        {{
            "asset": "Name of the short-term liability",
            "amount": "Integer representing the value of the liability",
            "currency": "SO 4217 currency code (three-letter-code)",
            "financialInstitution": "Name of the financial institution"
        }}
    ]
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background --- 
`

const securityAssetsPrompt = `
**Instruction**: 
- You will receive background data.
- Determine the **long-term security assets** of the person including: **Portfolios**, **Advisory Mandates**, **Discretionary Mandates** etc.
- Use the structure provided below for your response.
- **Avoid assumptions**. If certain details are absent, please leave them blank.

**Example**: 
If the background data says: 
"Sarah's liquidity position is robust, evidenced by her substantial cash reserves of 500,000 CHF. Additionally, she has
a Vontobel Volt portfolio containing 100k CHF, and an additional equities portfolio valued at 200k EUR."

Your output might be:
\`\`\`
{{
    "entries": [
        {{
            "asset": "Volt",
            "amount": 100000,
            "currency": "CHF",
            "financialInstitution": "Vontobel"
            
        }},
        {{
            "asset": "Portfolio",
            "amount": 200000,
            "currency": "EUR",
            "financialInstitution": ""
        }}
    ]
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "entries": [
        {{
            "asset": "Name of the long-term security asset",
            "amount": "Integer representing the value of the investment",
            "currency": "SO 4217 currency code (three-letter-code)",
            "financialInstitution": "Name of the financial institution"
        }}
    ]
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background --- 
`

const securityLiabilitiesPrompt = `
**Instruction**: 
- You will receive background data.
- Determine the **mid-term liabilities** and **mid-term liabilities** of the person including: **Lombard Loans**, **Mortgages**, etc.
- Consider liabilities with a maturity of more than one year
- Use the structure provided below for your response.
- **Avoid assumptions**. If certain details are absent, please leave them blank.

**Example**: 
If the background data says: 
"Sarah's liabilities include payday loans up to 200'000 CHF. In addition to that, she also has a long-running mortgages
with Deutsche Bank totalling 500k EUR."

Your output might be:
\`\`\`
{{
    "entries": [
        {{
            "asset": "Mortgage",
            "amount": 500000,
            "currency": "CHF",
            "financialInstitution": "Deutsche Bank"
        }}
    ]
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "entries": [
        {{
            "asset": "Name of the mid-term or long-term liability",
            "amount": "Integer representing the value of the liability",
            "currency": "SO 4217 currency code (three-letter-code)",
            "financialInstitution": "Name of the financial institution"
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
    liquidityLiabilitiesPrompt,
    securityAssetsPrompt,
    securityLiabilitiesPrompt
}