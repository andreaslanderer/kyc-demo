
const factListPrompt = `
**Instruction**:
- Examine the provided **background data**.
- Extract key facts about the individuals mentioned, focusing on their names, relationships, locations, nationalities, and other relevant personal details.
- Present these facts as a list in a JSON object.

**Example**:
Given the background: 
"Paula Meier was born in Karlsruhe, Germany on 13.01.1986. She was born in a hospital. She is the youngest daughter of
Josef and Elisabeth Meier, who also live in Karlsruhe. Her two older brothers, Paul and Erik, live in the USA and in Sweden, respectively"
Your output might be:
\`\`\`
{{
    "facts": [
        "Paula Meier was born in Karlsruhe, Germany",
        "She was born on 13.01.1986",
        "Her parents are Paula Meier and Elisabeth Meier who live in Karlsruhe, Germany",
        "She has two older brothers",
        "Her brother Paul lives in the USA",
        "Her brother Erik lives in Sweden"
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
export {
    factListPrompt,
    civilStatusPrompt,
    noChildrenPrompt,
    personalDetailsPrompt,
    relationBetweenPartnersPrompt
}