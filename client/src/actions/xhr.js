import axios from 'axios';

/**
 *  XHR Wrapper for all RESTful service requests
 *  Implements AXIOS for POST, PUT, DELETE
 */
export const xhr = {
    /**
     * 
     * @param {string} URL
     * @return {string}
     */
    createURL: (url) => {
        const apx = url.indexOf('?') === -1 ? '?' : '&';

        return `${url}${apx}`;
    },

    /**
     * GET
     * @param {string} URL
     * @param {object} params
     * @return {promise} axios promise
     */
    get: (URL, params, options) => {
        return axios.get(xhr.createURL(URL), { params, ...options });
    },

    /**
     * POST
     * @param {string} URL
     * @param {object} params
     * @return {promise} axios promise
     */
    post: (URL, params, config) => {
        return axios.post(xhr.createURL(URL), params, config);
    },
};

