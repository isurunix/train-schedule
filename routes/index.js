var express = require('express');
var router = express.Router();
var stations = require('../stations.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SL Train Schedule', stationList: stations });
});

module.exports = router;
