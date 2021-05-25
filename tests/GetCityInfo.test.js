const getCityInfo = require('../src/utils/city')


test('should retrieve specific city', () => {

    const test = {
        "id" : "01",
        "label" : "Montreal",
        "description" : [ 
                            "Montreal, Quebec, incorporated as a city in 1832, population 1,704,694 (2016 c), 1,649,519 (2011 c).",
                            " Montreal is Canada’s second largest city and is home to nearly half of the province of Quebec’s",
                            " population. It is the metropolis of the province and was the most populous city in Canada for a",
                            " century and a half. It is located in southwestern Quebec on Île de Montreal at the confluence ",
                            "of the St. Lawrence and Ottawa rivers."
                        ]     
    }

    const city = getCityInfo('01', (error, city) => {
        expect(city).toBeDefined()
        expect(city).toEqual(test)
    })
})