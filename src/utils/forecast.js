const moment = require('moment')
const request = require('request-promise')

/**
 * Retrieves forecast from external API
 * @param {*} location 
 * @param {*} forecastInfo 
 */
const forecast = (location, forecastInfo) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=66045d2b05a14061be5155922212105&q=' + location + '&aqi=no&days=5'


    request({url, json: true})
        .then(( body ) => {

            let forecast = []
            for(index = 0; index < 5; index++) {
                const day = {
                    dayOfWeek: moment(body.forecast.forecastday[index].date).format('dddd'),
                    date: body.forecast.forecastday[index].date,
                    condition: {
                        text: body.forecast.forecastday[index].day.condition.text,
                        icon: 'http:' + body.forecast.forecastday[index].day.condition.icon
                    },
                    maxTemp: 'High: ' + body.forecast.forecastday[index].day.maxtemp_c + ' C',
                    minTemp: 'Low: ' + body.forecast.forecastday[index].day.mintemp_c + ' C'
                }
                forecast.push(day)
            }
            
            forecastInfo(undefined, forecast)
        })
        .catch(( error ) => {
            forecastInfo('Unable to connect to weather service')
        })
 
}

module.exports = forecast