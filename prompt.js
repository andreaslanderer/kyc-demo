const personalDetailsPrompt = `
    Instruction: 
    Based on the background data provided basic personal details of the person.
    Pay special attention to contradicting information.
    Your response should be according to the defined output structure.
    Your response must only contain the JSON object.
    
    --- Begin Background ---
    
    {background}
    
    --- End Background --- 
    
    --- Begin Output Structure ---
    
    {{
        "firstName": "The first name of the person; if unknown leave empty, DON'T use the salutation (e.g. Frau, Herr, etc.)",
        "lastName": "The last name of the person",
        "dateOfBirth": "The date of birth of the person; FORMAT: yyyy-mm-dd",
        "nationality": "The nationality of the person; FORMAT: ISO 2-letter country code, e.g. CH, US",
        "domicile": "The domicile of the person, FORMAT: ISO 2-letter country code, e.g. CH, US",
        "reasoning": "Please describe based on which information you came to your conclusion"
    }}
    
    --- End Output Structure ---
`

const civilStatusPrompt = `
    Instruction: 
    Based on the background data provided determine the civil status of the person.
    Pay special attention to contradicting information.
    Your response should be according to the defined output structure.
    Your response must only contain the JSON object.
    
    --- Begin Background ---
    
    {background}
    
    --- End Background --- 
    
    --- Begin Output Structure ---
    
    {{
        "civilStatus": "One of the following values: SINGLE, MARRIED, DIVORCED, WIDOWED, SEPARATED, UNKNOWN",
        "changeOfCivilStatus": "The date when the civil status changed, e.g. date of marriage, divorce date; FORMAT: yyyy-mm-dd"
        "reasoning": "Please describe based on which information you came to your conclusion"
    }}
    
    --- End Output Structure ---
`

const noChildrenPrompt = `
    Instruction: 
    Based on the background data provided determine the number of children the person has.
    Your response should be according to the defined output structure.
    Your response must only contain the JSON object.
    
    --- Begin Background ---
    
    {background}
    
    --- End Background --- 
    
    --- Begin Output Structure ---
    
    {{
        "noChildren": "Numeric value representing the number of children",
        "reasoning": "Please describe based on which information you came to your conclusion"
    }}
    
    --- End Output Structure ---
`

const relationBetweenPartnersPrompt = `
    Instruction: 
    Based on the background data provided determine the relationships the person has to other partners.
    Your response should be according to the defined output structure.
    Your response must only contain the JSON-array, each object representing a relationship to one partner.
    
    --- Begin Background ---
    
    {background}
    
    --- End Background --- 
    
    --- Begin Output Array ---
   
   {{
        "relations": [
            {{ 
                "firstName": "The first name of the related person",
                "lastName": "The last name of the related person",
                "id": "The id of the related person; leave empty of not available",
                "relationType": "One of the following values: SPOUSE, PARENT, CHILD, GRANDPARENT, GRANDCHILD, SIBLING, UNKNOWN",
                "dateOfBirth": "The date of birth of the related person; FORMAT: yyyy-mm-dd",
                "dateOfDeath": "In case the related person is already deceased; FORMAT: yyyy-mm-dd"
                "nationality": "Comma-separated list of nationalities of the related person; FORMAT: ISO 2-letter country code, e.g. CH, US",
                "domicile": "Comma-separated list of domiciles of the related person, FORMAT: ISO 2-letter country code, e.g. CH, US"
                "reasoning": "Please describe based on which information you came to your conclusion"
            }}
        ]
    }}
    
    --- End Output Array ---
    
    --- Begin Example ---
    
    Input: 
    
    Family situation of the client:
    Maria Messi is married to Jose. Her son Lionel lives in Miami. Her daughter Angela is a
    Spanish citizen and lives in Barcelona.
    
    Output:
    {{
        relations: [
            {{
                "partnerName": "Jose Messi",
                "partnerId": "",
                "relationType": "SPOUSE",
                "dateOfBirth": "",
                "nationality": "",
                "domicile": "",
                "reasoning": "Is mentioned in family situation"
            }},
            {{
                "partnerName": "Lionel Messi",
                "partnerId": "",
                "relationType": "CHILD",
                "dateOfBirth": "",
                "nationality": "",
                "domicile": "US",
                "reasoning": "Is mentioned in family situation"
            }},
            {{
                "partnerName": "Angela Messi",
                "partnerId": "",
                "relationType": "CHILD",
                "dateOfBirth": "",
                "nationality": "ES",
                "domicile": "ES",
                "reasoning": "Is mentioned in family situation"
            }}
        ]
    }}
    
    --- End Example ---
`

const educationPrompt = `
**Instruction**: 
- You will receive background data.
- Determine the **educational career** of the person using this data.
- Use the structure provided below for your response.
- **Avoid assumptions**. If certain details, such as exact dates or institution names are absent, please leave them blank.

**Example**: 
If the background data says: "Sarah studied Computer Science at TechUniversity from 2010 to 2014."
Your output might be:
\`\`\`
{{
    "educations": [
        {{
            "institutionName": "TechUniversity",
            "degree": "Computer Science",
            "startYear": "2010",
            "endYear": "2014",
            "reasoning": "Sarah studied Computer Science at TechUniversity from 2010 to 2014."
        }}
    ]
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "educations": [
        {{
            "institutionName": "Name of the educational institution",
            "institutionLocation": "Location or city of the institution",
            "degree": "Earned degree or field of study",
            "startYear": "Start year in 'yyyy' format",
            "endYear": "End year in 'yyyy' format, if applicable",
            "additionalInformation": "Any extra or missing details about the educational phase",
            "reasoning": "Your basis for the provided details"
        }}
    ]
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background --- 
`

const employmentPrompt = `
    **Instruction**: 
    - You will receive background data.
    - Determine the current and previous employments of the person based on this data.
    - Include employments where the person was an **employee** or held a **leading position** like CEO.
    - Your output should match the structure provided below.
    - **Avoid assumptions**. If any details like exact dates or names are missing, leave them blank.
    
    **Example**: 
    If the background data says: "Jane started as a Marketing Manager at TechCorp in 2015 and moved to AlphaTech as a CEO in 2019."
    Your output might be:
    \`\`\`
    {{
        "employments": [
            {{
                "position": "Marketing Manager",
                "placeOfWork": "TechCorp",
                ...
                "startDate": "2015-01-01",
                "endDate": "2019-01-01",
                "reasoning": "Jane started as a Marketing Manager at TechCorp in 2015."
            }},
            {{
                "position": "CEO",
                "placeOfWork": "AlphaTech",
                ...
                "startDate": "2019-01-01",
                "endDate": "",
                "reasoning": "Moved to AlphaTech as a CEO in 2019."
            }}
        ]
    }}
    \`\`\`
    
    **Expected Output Structure**: 
    \`\`\`
    {{
        "employments": [
            {{
                "position": "Specific position or title at the company",
                "placeOfWork": "Location or department of the employment",
                "nameOfTheCompany": "Company's name",
                "industry": "Company's line of business",
                "countries": ["List of countries where the company operates"],
                "geographicalRegion": ["List of regions where the company operates"],
                "sizeOfCompany": {{
                    "employees": "Number of employees",
                    "turnover": "Turnover with currency",
                    "profit": "Profit with currency"
                }},
                "startDate": "Start date in yyyy-mm-dd format",
                "endDate": "End date in yyyy-mm-dd format, if applicable",
                "additionalInformation": "Additional details or missing information about the employment",
                "reasoning": "Your basis for the provided information"
            }}
        ]
    }}
    \`\`\`
    
    --- Begin Background ---
    
    {background}
    
    --- End Background --- 
`

const unemploymentPrompt = `
    **Instruction**: 
    - You will be provided with background data.
    - Your task is to determine phases of unemployment of the person based on this data.
    - Return a JSON-array with each object representing a phase of unemployment.
    - Follow the structure given below for your output.
    - Do **not** make assumptions. If information like exact dates or names is missing, leave it blank.

    **Example**: 
    If the background data says: "John graduated in 2010 and got his first job in 2012."
    Your output should be:
    \`\`\`
    {{
        "unemployment": [
            {{
                "details": "After graduation and before first job",
                "startDate": "2010",
                "endDate": "2012",
                "reasoning": "John graduated in 2010 and got his first job in 2012."
            }}
        ]
    }}
    \`\`\`

    **Expected Output Structure**: 
    \`\`\`
    {{
        "unemployment": [
            {{
                "details": "Description of the unemployment phase",
                "startDate": "start date in yyyy-mm format",
                "endDate": "end date in yyyy-mm format",
                "reasoning": "Your reasoning based on the provided background data"
            }}
        ]
    }}
    \`\`\`

    --- Begin Background ---

    {background}
    
    --- End Background --- 
`

const selfEmploymentPrompt = `
    **Instruction**: 
    - You will receive background data.
    - Determine the self-employments of the person based on this data.
    - Focus on situations where the person **owned** a company.
    - Your output should match the structure provided below.
    - **Avoid assumptions**. If certain details like exact dates or names are absent, leave them blank.
    
    **Example**: 
    If the background data says: "Mike founded GreenTech in 2008, a renewable energy company in the USA."
    Your output might be:
    \`\`\`
    {{
        "selfEmployment": [
            {{
                "companyName": "GreenTech",
                "industry": "Renewable energy",
                ...
                "startDate": "2008-01-01",
                "countries": ["USA"],
                "reasoning": "Mike founded GreenTech in 2008, a renewable energy company in the USA."
            }}
        ]
    }}
    \`\`\`
    
    **Expected Output Structure**: 
    \`\`\`
    {{
        "selfEmployment": [
            {{
                "companyName": "Name of the company",
                "registeredAddress": "Company's registered address",
                "countries": ["List of countries where the company operates"],
                "geographicalRegion": ["List of regions where the company operates"],
                "ownership": "Specific details about ownership structure",
                "businessPartners": ["List of business partners involved with the company"],
                "industry": "Company's line of business",
                "sizeOfCompany": {{
                    "employees": "Number of employees",
                    "turnover": "Turnover with currency",
                    "profit": "Profit with currency"
                }},
                "businessBackground": "Information on financial and expertise sources for starting the business",
                "startDate": "Start date in yyyy-mm-dd format",
                "endDate": "End date in yyyy-mm-dd format, if applicable",
                "additionalInformation": "Any extra or missing details about the company",
                "reasoning": "Your basis for the provided details"
            }}
        ]
    }}
    \`\`\`
    
    --- Begin Background ---
    
    {background}
    
    --- End Background --- 
`

export {
    civilStatusPrompt,
    educationPrompt,
    employmentPrompt,
    noChildrenPrompt,
    personalDetailsPrompt,
    relationBetweenPartnersPrompt,
    selfEmploymentPrompt,
    unemploymentPrompt
}