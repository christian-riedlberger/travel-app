var express = require('express')
var router = express.Router()
const fs = require('fs');
const forecast = require('../src/utils/forecast')
const getCityInfo = require('../src/utils/city')

/**
 * Route to get forecast data and city description
 */
router.post('/', function(req, res, next) {
       

    forecast(req.body.name, (error, forecastData) => {
        if (error) {
            return res.send({
                error
            })  
        }
        
        getCityInfo(req.body.id, (error, city) => {
            if (error) {
                return res.send({
                    error
                })  
            }

            res.send({
                forecast: forecastData,
                city
            })
        })
    })
});

module.exports = router;