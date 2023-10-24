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
    Instruction: 
    Based on the background data provided determine the educational career of the person.
    Your response should be according to the defined output structure.
    Your response must only contain the JSON-array, each object representing a stage of his educational career.
    Do not make assumptions: If you're missing information e.g. exact dates or names, leave them blank.
    
    --- Begin Background ---
    
    {background}
    
    --- End Background --- 
    
    --- Begin Output Array ---
   
   {{
        "educations": [
            {{ 
                "institutionName": "The name of the school, high-school, university, etc.",
                "institutionLocation": "The location of the school, high-school, university, etc.",
                "degree": "The degree earned, e.g. B.Sc., M.Sc., PhD",
                "startYear": "The year when the educational stage started; FORMAT: yyyy",
                "endYear": "The year when the educational stage finished; FORMAT: yyyy",
                "additionalInformation": "Any additional or missing information about the educational stage"
                "reasoning": "Please describe based on which information you came to your conclusion"
            }}
        ]
    }}
    
    --- End Output Array ---
`

export {
    civilStatusPrompt,
    educationPrompt,
    noChildrenPrompt,
    personalDetailsPrompt,
    relationBetweenPartnersPrompt
}