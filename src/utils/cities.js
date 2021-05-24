const fs = require('fs');


/**
 * Fetches cities info fron json file
 * @param {*} citiesInfo 
 */
const getCities = (citiesInfo) => {

    const fileName = __dirname + '/cities.json'

    fs.readFile(fileName, (error, contents) => {
        if (error) {
            citiesInfo('Unable to read file')
        }

        const cities = JSON.parse(contents);

        citiesInfo(undefined, cities) 
    })    
}

module.exports = getCities
   