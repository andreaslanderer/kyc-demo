const personalDetailsPrompt = `
**Instruction**: 
- You will receive background data about an individual.
- Extract basic **personal details** from this data.
- Be vigilant for any **contradicting information**.
- Use the structure provided below for your response.
- **Do not assume**. If specific details are missing, leave the corresponding fields empty.

**Example**: 
If the background data says: "John Smith, born on 1990-05-12, holds a US passport and resides in Switzerland."
Your output might be:
\`\`\`
{{
    "firstName": "John",
    "lastName": "Smith",
    "dateOfBirth": "1990-05-12",
    "nationality": "US",
    "domicile": "CH",
    "reasoning": "John Smith, born on 1990-05-12, holds a US passport and resides in Switzerland."
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "firstName": "Person's first name (omit salutations like Frau, Herr, etc.)",
    "lastName": "Person's last name",
    "dateOfBirth": "Date of birth in 'yyyy-mm-dd' format",
    "nationality": "Nationality in ISO 2-letter country code format (e.g., CH, US)",
    "domicile": "Domicile in ISO 2-letter country code format (e.g., CH, US)",
    "reasoning": "Your rationale for the details provided"
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background --- 
`

const civilStatusPrompt = `
**Instruction**: 
- You will be provided with background data about an individual.
- Identify the person's **civil status** from this data.
- Be vigilant for any **contradictory details**.
- Your output should adhere to the structure below.

**Example**: 
If the background data says: "Jane, who was previously single, got married to Tom on 2018-06-15."
Your output might be:
\`\`\`
{{
    "civilStatus": "MARRIED",
    "changeOfCivilStatus": "2018-06-15",
    "reasoning": "Jane got married to Tom on 2018-06-15."
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "civilStatus": "Civil status in one of the following: SINGLE, MARRIED, DIVORCED, WIDOWED, SEPARATED, UNKNOWN",
    "changeOfCivilStatus": "Date of change in 'yyyy-mm-dd' format (e.g., date of marriage, date of divorce)",
    "reasoning": "Your rationale for the provided information"
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background --- 
`

const noChildrenPrompt = `
**Instruction**: 
- Analyze the provided background data.
- Identify the **number of children** the person has.
- Structure your output as described below.

**Example**: 
If the background data says: "John and his wife have three kids: Mike, Anna, and Lisa."
Your output might be:
\`\`\`
{{
    "noChildren": "3",
    "reasoning": "John has three kids: Mike, Anna, and Lisa."
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "noChildren": "Numeric value indicating the number of children",
    "reasoning": "Your basis for the provided count"
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background --- 
`

const relationBetweenPartnersPrompt = `
**Instruction**: 
- Examine the provided background data.
- Identify the **relationships** the person has with other individuals.
- Ensure your response matches the structure described below.

**Example**: 
Given the background: "Maria Messi is married to Jose. Her son Lionel lives in Miami. Her daughter Angela is a Spanish citizen and lives in Barcelona."
Your output might be:
\`\`\`
{{
    "relations": [
        {{
            "firstName": "Jose",
            "lastName": "Messi",
            "relationType": "SPOUSE",
            "reasoning": "Maria Messi is mentioned as married to Jose."
        }},
        {{
            "firstName": "Lionel",
            "lastName": "Messi",
            "relationType": "CHILD",
            "domicile": "US",
            "reasoning": "Mentioned as Maria Messi's son living in Miami."
        }},
        {{
            "firstName": "Angela",
            "lastName": "Messi",
            "relationType": "CHILD",
            "nationality": "ES",
            "domicile": "ES",
            "reasoning": "Mentioned as Maria Messi's daughter and a Spanish citizen living in Barcelona."
        }}
    ]
}}
\`\`\`

**Expected Output Structure**: 
\`\`\`
{{
    "relations": [
        {{
            "firstName": "First name of the related individual",
            "lastName": "Last name of the related individual",
            "id": "ID of the related individual (if available)",
            "relationType": "Type of relationship: SPOUSE, PARENT, CHILD, GRANDPARENT, GRANDCHILD, SIBLING, UNKNOWN",
            "dateOfBirth": "Birth date in 'yyyy-mm-dd' format",
            "dateOfDeath": "Death date in 'yyyy-mm-dd' format (if applicable)",
            "nationality": "List of nationalities in ISO 2-letter country code format (e.g., CH, US)",
            "domicile": "List of domiciles in ISO 2-letter country code format (e.g., CH, US)",
            "reasoning": "Your rationale for the provided details"
        }}
    ]
}}
\`\`\`

--- Begin Background ---

{background}

--- End Background --- 
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