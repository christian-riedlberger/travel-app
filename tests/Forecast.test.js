const moment = require('moment')
const forecast = require('../src/utils/forecast')


test('should retrieve forecast for specific city', () => {

    forecast('Toronto', (error, forecastData) => {
        expect(forecastData).toBeDefined()
        expect(forecastData[0].dayOfWeek).toBe(moment().format('dddd'))
    })
})

test('should retrieve forecast for specific city', () => {

    forecast('$%^#', (error, forecastData) => {
        expect(error).toBeDefined()
    })
})