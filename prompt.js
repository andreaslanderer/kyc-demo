
const systemPrompt = `
    Please take the text below and extract the following data:

    {text}
    
    Target structure:
   
    {{
        "fullName": "The full name of the person as 'FirstName LastName'",
        "dateOfBirth": "dd.mm.yyyy",
        "relationshipStatus": "married, single, etc. "
        "relationships": [
            {{
                "relation": "daughter, husband, mother, father, etc.",
                "fullName": "The full name of the person as 'FirstName LastName",
                "dateOfBirth": "dd.mm.yyyy",
                "dateOfDeath": "dd.mm.yyyy"
            }}
        ]
    }}

    Names should always be displayed as "Firstname Lastname"
    Feel free to fix any typos. 
    Add an additional top-level property "remarks" for additional information and hints that do not fit the other properties. 
    If you find any irregularities, contradictions or missing information please add them to the "remarks" property as well.
    Your response must only contain the JSON object and nothing else!
`

const familySituationOfTheClientBackground = `
    Family situation of the client:
    {familySituationOfTheClient}
`

const personalDetailsPrompt = `
    Instruction: 
    Based on the background data provided basic personal details of the person.
    Pay special attention to contradicting information.
    Your response should be according to the defined output structure.
    Your response must only contain the JSON object.
    
    --- Begin Background ---
    
    ${familySituationOfTheClientBackground}
    
    --- End Background --- 
    
    --- Begin Output Structure ---
    
    {{
        "firstName": "The first name of the person",
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
    
    ${familySituationOfTheClientBackground}
    
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
    
    ${familySituationOfTheClientBackground}
    
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
    
    ${familySituationOfTheClientBackground}
    
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
                "nationality": "The nationality of the related person; FORMAT: ISO 2-letter country code, e.g. CH, US",
                "domicile": "The domicile of the related person, FORMAT: ISO 2-letter country code, e.g. CH, US"
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

export {
    civilStatusPrompt,
    noChildrenPrompt,
    personalDetailsPrompt,
    relationBetweenPartnersPrompt,
    systemPrompt
}