var express = require('express');
var router = express.Router();

/*
 * GET home page.
 */

var flights = require('../data');

var flight = require('../flight');

for(var number in flights) {
	flights[number] = flight(flights[number]);
}

/* GET flight */
router.get('/flight/:number', function(req, res){
	var number = req.params.number;

	if (typeof flights[number] === 'undefined') {
		res.status(404).json({status: 'error'});
	} else {
		res.json(flights[number].getInformation());
	}
});

router.put('/flight/:number/arrived', function(req, res) {
	var number = req.params.number;

	if (typeof flights[number] === 'undefined') {
		res.status(404).json({status: 'error'});
	} else {
		flights[number].triggerArrive();
		res.json({ status : "done"});
	}
});

router.get('/list', function (req, res) {
	res.render('list', {
		title: 'All Flights', 
		flights: flights});
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// exports.list = function (req, res) {
// 	res.render('list', {
// 		title: 'All Flights', 
// 		flights: flights});
// };


module.exports = router;
