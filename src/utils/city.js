const getCities = require('./cities')

/**
 * Fetches city's description
 * @param {*} id 
 * @param {*} cityInfo 
 */
const getCityInfo = (id, cityInfo) => {

    getCities((error, cities) => {
        if (error) {
            cityInfo('Unable to read file')
        }

        const city = cities.find(city => id === city.id) 

        cityInfo(undefined, city) 
    })

}

module.exports = getCityInfo  
