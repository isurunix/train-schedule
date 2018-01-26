/**
 * Created by isuru on 3/16/17.
 */
var express = require('express');
var request = require('request');
var config = require('../conf/config.json');
var stations = require('../stations.json');
var buffer = require('buffer');
var moment = require('moment');

var router = express.Router();

router.get('/', function (req, res, next) {

    if (!config.TOKEN ||
        config.TOKEN && moment(Date.now()).diff(moment(config.TOKEN.timestamp), 'seconds') > (config.TOKEN.expires_in - 30)) {
        getCredentials(req, res, getData);
    } else {
        getData(req, res);
    }
});

function getCredentials(req, res, next) {
    var key = config.CONSUMER_KEY + ':' + config.CONSUMER_SECRET;
    var auth = 'Basic ' + buffer.Buffer.from(key).toString('base64');
    var authBody = "grant_type=client_credentials";

    request({
        uri: "http://api.lankagate.gov.lk:8280/token",
        method: "POST",
        headers: {
            Authorization: auth,
            'Content-Length': authBody.length,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: authBody
    }, function (error, response, body) {
        if (!error) {
            config.TOKEN = body;
            config.TOKEN.timestamp = Date.now();
            next(req, res);
        } else {
            res.sendStatus(500);
        }

    });
}

function getData(req, res) {
    var token = JSON.parse(config.TOKEN);
    request({
        uri: "http://api.lankagate.gov.lk:8280/railway/1.0/train/searchTrain?startStationID=" + req.query.from + "&endStationID=" +
            req.query.to + "&searchDate=" + req.query.date + "&startTime=00:00:00&endTime=23:59:00&lang=en",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + token.access_token
        },
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function (error, response, body) {
        res.type('json').send(body);
    });
}

module.exports = router;