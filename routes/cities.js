var express = require('express')
var router = express.Router()
const getCities = require('../src/utils/cities')

/**
 * Route to get list of cities
 */
router.get('/', function(req, res, next) {
    getCities((error, cities) => {
        if (error) {
            return res.send({
                error
            })  
        }

        res.send({
            cities
        })
    })
});

module.exports = router;