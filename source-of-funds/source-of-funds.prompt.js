const incomeMiscellaneousPrompt = `
**Instruction**: 
- Analyze the provided background data.
- Analyze the input for misellaneous income, source of funds, or other income
- Focus on funds, income and disposals that do not clearly fit into categories such as business activities, salary, inheritances from whoever, investment sales or real estate sales of all kinds of buildings. As so not fit to selling interests.
- Structure your response as shown below.
- **Avoid assumptions**. If certain details such as the origin of the income or funds are missing, please leave them blank.

**Example**:
If the background data says: "Martin received an unexpected windfall of 100,000 CHF from undisclosed sources in 2020."
Your output might be:
\`\`\`
{{
    "incomeMiscellaneous"
:
    [
        {{
            "description": "Undisclosed sources windfall",
            "amount": 100000,
            "currency": CHF,
            "asofdate": 2020
        }}
    ]
}}
\`\`\`

**Expected Output Structure**:
\`\`\`
{{
    "incomeMiscellaneous"
:
    [
        {{
            "description": "Description of the miscellaneous income source",
            "amount": "Numeric value (decimal) indicating the amount",
            "currency": "Currency in ISO-Code",
            "asofdate": "End date in yyyy-mm-dd format"
        }}
        // ...weitere Einkommensquellen
    ]
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background ---
`

const incomeFromBusinessActivitiesPrompt = `
**Instruction**:
- Analyze the provided background data.
- Focus specifically on income related to work, employment, business activities, lectures, and teaching.
- Exclude any data related to material goods values or financial instruments such as shares.
- Extract and analyze information regarding funds, income, and disposals from these sources.
- Use the structure provided below for your response.
- All miscellaneous position are not part uf business activities
- **Avoid assumptions**. If certain details are not clearly related to the specified activities, please ignore them.

**Example**:
Background: "Sarah earned 120,000 CHF in 2020 from her role as a university lecturer and received a bonus of 30,000 CHF for her research work."
Your output might be:
\`\`\`
{{
    "incomeFromBusinessActivities"
:
    [
        {{
            "description": "University lecturer salary",
            "amount": 120000,
            "currency": "CHF",
            "asofdate": "2020"
        }},
        {{
            "description": "Research work bonus",
            "amount": 30000,
            "currency": "CHF",
            "asofdate": "2020"
        }}
    ]
}}
\`\`\`

**Expected Output Structure**:
\`\`\`
{{
    "incomeFromBusinessActivities"
:
    [
        {{
            "description": "Description of the income source related to work or activity",
            "amount": "Numeric value indicating the amount",
            "currency": "Currency in which the amount is denominated",
            "asofdate": "Year of the income or activity (yyyy format)"
        }}
        // ...additional income sources
    ]
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background ---
`

const incomeFromRealEstateSalesPrompt = `
**Instruction**:
- Analyze the provided background data.
- Identify, analyze and extract details about any kind of income from the sale of real estate like any kind of buildings.
- All miscellaneous position are not part uf business activities
- Use the structure provided below for your response.

**Example**:
If the background data says: "Mary sold her villa in Zürich June 2017 for 1.2 million CHF."
Your output might be:
\`\`\`
{{
    "incomeFromRealEstateSales": [
        {{
            "description": "Villa in Zürich",
            "asofdate": "2017-06-15",
            "currency": "CHF",
            "amount": 1200000
        }}
    ]
}}
\`\`\`

**Expected Output Structure**:
\`\`\`
{{
    "incomeFromRealEstateSales": [
        {{
            "description": "Description of the property sold",
            "amount": "Sale amount (numeric value)",
            "currency": "Currency in ISO-Code",
            "asofdate": "ate of sale (yyyy-mm-dd)"
        }}
    ]
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background ---
`

const incomeFromInheritancePrompt = `
**Instruction**:
- Analyze the provided background data.
- Identify, analyze and extract details about any kind of income by inheritance, heritage or legacy.
- All miscellaneous position are not part uf business activities
- Use the structure provided below for your response.

**Example**:
If the background data says: "Mary got a heritage by her father by 2022 of 5 Mio USD after the father died on 1.1.2021"
Your output might be:
\`\`\`
{{
    "incomeFromInheritance": [
        {{
            "description": "Heritage of her Father",
            "asofdate": "2022-12-31",
            "currency": "CHF",
            "amount": 5000000
        }}
    ]
}}
\`\`\`

**Expected Output Structure**:
\`\`\`
{{
    "incomeFromInheritance": [
        {{
            "description": "Description of the heritage, inheritance or legacy",
            "amount": "Amount (numeric value)",
            "currency": "Currency in ISO-Code",
            "asofdate": "Date of sale (yyyy-mm-dd)"
        }}
    ]
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background ---
`

const incomeFromSalesInterestPrompt  = `
**Instruction**:
- Analyze the provided background data.
- Identify, analyze and extract details only about interests.
- All miscellaneous position are not part uf business activities
- Use the structure provided below for your response.

**Example**:
If the background data says: "Mary has selled all her interest of the family company in the june 2012 for around 2 Mio USD"
Your output might be:
\`\`\`
    {{
        "incomeFromSalesInterest"
    :
        [
            {{
            "description": "Selled interest of the company",
            "asofdate": "2012-06-01",
            "currency": "USD",
            "amount": 2000000
        }}
    ]
}}
\`\`\`

**Expected Output Structure**:
\`\`\`
    {{
        "incomeFromSalesInterest"
    :
        [
            {{
            "description": "Description of the interest",
            "amount": "Amount (numeric value)",
            "currency": "Currency in ISO-Code",
            "asofdate": "Date of sale (yyyy-mm-dd)"
        }}
    ]
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background ---
`
export {
    incomeMiscellaneousPrompt,
    incomeFromRealEstateSalesPrompt,
    incomeFromBusinessActivitiesPrompt,
    incomeFromInheritancePrompt,
    incomeFromSalesInterestPrompt
}
