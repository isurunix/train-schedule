/**
 * Created by isuru on 3/16/17.
 */
var express = require('express');
var request = require('request');
var stations = require('../stations.json');

var router = express.Router();

router.get('/',function (req, res, next) {
    request({
        uri: "http://railway.lankagate.gov.lk/train/searchTrain?startStationID=" + req.query.from + "&endStationID=" + req.query.to + "&searchDate=" + req.query.date +
        "&startTime=00:00:00&endTime=23:59:00&lang=en",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(error, response, body) {
        res.type('json').send(body);
    });
});

module.exports = router;
