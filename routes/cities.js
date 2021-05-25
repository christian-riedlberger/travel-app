var express = require('express')
var router = express.Router()
const getCities = require('../src/utils/cities')
const citiesTable = require('../src/utils/citiesTable')

/**
 * Route to get list of cities
 */
router.get('/', function(req, res, next) {

    res.send({
        cities: citiesTable.cities
    })

});

module.exports = router;