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
`;

export { sourceOfFundsPrompt };
