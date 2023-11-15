const sourceOfFundsPrompt = `
**Instruction**: 
- Analyze the provided background data.
- Extract details regarding the source of funds as per the structure below.
- Ensure that your response adheres to the provided format and covers all relevant aspects.

**Expected Output Structure**: 
\`\`\`
{{
    "plannedInitialInvestmentChf": "Numeric value (decimal) indicating the planned initial investment",
    "percentageOfNewWorth": "Numeric value (decimal) indicating the percentage of new worth",
    "longTermPlannedAssetsChf": "Numeric value (decimal) indicating the long term planned assets",
    "assetIncomingsOnBehalf": ["List of asset incomings, e.g., 'Transfer', 'InCash', 'TransferOfSecurities', 'DeliveryOfSecuritiesPreciousMetal']",
    "incomingInstitutionBanks": [
        {{
            "institutionBankName": "Name of the institution/bank",
            "placeOfTheInstitutionBank": "Place of the institution/bank",
            "countryIsoCode": "ISO country code of the institution/bank"
        }}
        // ...weitere Banken
    ],
    "originFundsFromBusinessActivitiesChf": "Numeric value (decimal) indicating funds from business activities",
    "originFundsFromDepositChf": "Numeric value (decimal) indicating funds from deposit",
    "originFundsFromSaleOfInterestsChf": "Numeric value (decimal) indicating funds from the sale of interests",
    "originFundsFromSaleOfRealEstateChf": "Numeric value (decimal) indicating funds from the sale of real estate",
    "originFundsFromMiscellaneous": {{
        "description": "Description of miscellaneous funds",
        "amountChf": "Numeric value (decimal) indicating the amount of miscellaneous funds"
    }},
    "documentForProofOfFundsAvailable": "Boolean indicating if the document for proof of funds is available",
    "identityOfBeneficialOwnerHasBeenVerified": "Boolean indicating if the identity of beneficial owner has been verified"
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background --- 
`
const incomeFromBusinessActivitiesPrompt = `
**Instruction**:
- Analyze the provided background data.
- Extract details about income from business activities.
- Your response should be structured as shown below.

**Example**:
Background: "John's tech startup had a significant breakthrough this year, earning a profit of 500,000 CHF."
Your output might be:
\`\`\`
{
    "incomeFromBusinessActivities"
:
    [
        {
            "description": "Profit from tech startup",
            "amountChf": 500000
        }
    ]
}
\`\`\`

**Expected Output Structure**:
\`\`\`
{
    "incomeFromBusinessActivities": [
        {
            "description": "Description of the income source",
            "amountChf": "Numeric value (decimal) indicating the amount"
        }
    ]
}
\`\`\`

--- Begin Background ---

{background}

--- End Background ---
`
const incomeFromRealEstateSalesPrompt = `
**Instruction**:
- Analyze the provided background data.
- Identify and extract details about income from the sale of real estate.
- Use the structure provided below for your response.

**Example**:
Background: "Mary sold her villa in Zürich last June for 1.2 million CHF."
Your output might be:
\`\`\`
{
    "incomeFromRealEstateSales"
:
    [
        {
            "propertyDescription": "Villa in Zürich",
            "saleDate": "2021-06-15",
            "saleAmountChf": 1200000
        }
    ]
}
\`\`\`

**Expected Output Structure**:
\`\`\`
{
    "incomeFromRealEstateSales": [
        {
            "propertyDescription": "Description of the property sold",
            "saleDate": "Date of sale (yyyy-mm-dd)",
            "saleAmountChf": "Sale amount in CHF (numeric value)"
        }
    ]
}
\`\`\`

--- Begin Background ---

{background}

--- End Background ---
`
export {
    sourceOfFundsPrompt,
    incomeFromRealEstateSalesPrompt,
    incomeFromBusinessActivitiesPrompt
}
