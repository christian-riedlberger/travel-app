const moment = require('moment')
import {
    fetchCities,
    fetchForecast
} from '../../actions/ActionTravel';

test('should retrieve list of cities', () => {
    const cities = fetchCities();

    expect(cities).toBeDefined()
})

test('should retrieve weather for location', () => {
    const location = {
        id: '01',
        name: 'Toronto',
    }

    const weather = fetchForecast(location)

    expect(weather).toBeDefined()
})