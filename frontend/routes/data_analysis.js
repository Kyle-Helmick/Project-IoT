var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/Project-IoT";

MongoClient.connect(url)
	.then( db => {
		return db.collection('Inverntory');
	})
	.then( collection => {
		router.get('/', async (req, res, next) => {
			tempArray = await collection.find().toArray();
			humidArray = await collection.find().toArray();
			lightArray = await collection.find().toArray();
			res.render('index', {temp: tempArray, title: 'temps over time'});
			res.render('index', {humid: humidArray, title: 'humidity over time'});
			res.render('index', {light: lightArray, title: 'light over time'});
		});

		

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('data_analysis', { title: 'Data Analysis' });
});

module.exports = router;
