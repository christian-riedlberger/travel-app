const citiesTable = require('./citiesTable')

/**
 * Fetches city's description
 * @param {*} id 
 * @param {*} cityInfo 
 */
const getCityInfo = (id, cityInfo) => {

    // getCities((error, cities) => {
    //     if (error) {
    //         cityInfo('Unable to read file')
    //     }

        cityArray = citiesTable.cities

        const city = cityArray.find(city => id === city.id)

        cityInfo(undefined, city) 
    // })

}

module.exports = getCityInfo  
