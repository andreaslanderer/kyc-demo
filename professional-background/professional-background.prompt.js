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
    - **Exclude** roles that signify ownership or founding of a company
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
                "endDate": "End date in yyyy-mm-dd format",
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
        "unemploymentPeriods": [
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
        "unemploymentPeriods": [
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
    If the background data says: "Mike founded GreenTech in 2008, a renewable energy company in the USA. The company
    is located in GreenTech Street 1000a, Palo Alto"
    Your output might be:
    \`\`\`
    {{
        "selfEmployments": [
            {{
                "companyName": "GreenTech",
                "registeredAddress": "GreenTech Street 1000a, Palo Alto",
                "countries": ["US"],
                "geographicalRegions": ["North America"],
                "ownership": "Mike was the sole founder",
                "businessPartners": [],
                "industry": "Renewable energy",
                "sizeOfCompany": {{}},
                "businessBackground": "",
                "startDate": "2008-01-01",
                "endDate": "",
                "additionalInformation": "",
                "reasoning": "Mike founded GreenTech in 2008, a renewable energy company in the USA."
            }}
        ]
    }}
    \`\`\`
    
    **Expected Output Structure**: 
    \`\`\`
    {{
        "selfEmployments": [
            {{
                "companyName": "Name of the company",
                "registeredAddress": "Company's registered address",
                "countries": ["List of countries where the company operates (ISO-2-Letter-code)"],
                "geographicalRegions": ["List of regions where the company operates"],
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
    educationPrompt,
    employmentPrompt,
    selfEmploymentPrompt,
    unemploymentPrompt
}