var express = require('express')
var router = express.Router()
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