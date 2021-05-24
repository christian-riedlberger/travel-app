import {
    WEATHER_API,
    CITIES_API
} from '../constants/ServiceURI';
import { xhr } from './xhr';

/**
 * Gets city list
 * @method GET
 * @returns request
 */
export function fetchCities() {
    const request = xhr.get(CITIES_API);

    return request;
}

/**
 * Retrieves forecast for certain location
 * @method POST
 * @param {*} location 
 * @returns request
 */
export function fetchForecast(location) {
    const request = xhr.post(WEATHER_API, location);

    return request;
}