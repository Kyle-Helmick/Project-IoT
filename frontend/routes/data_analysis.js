var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/Project-IoT"

MongoClient.connect(url)
	.then( db => {
		return db.collection('Temperature');
	})
	.then( collection => {
		router.get('/', async (req, res, next) => {
			tempArray = await collection.find().toArray();
			res.render('index', {temp: tempArray, title: 'temps over time'});
		})

	.then( db => {
		return db.collection('Humidity');
	})
	.then( collection => {
		router.get('/', async (req, res, next) => {
			humidArray = await collection.find().toArray();
			res.render('index', {humid: humidArray, title: 'humidity over time'});
		})

	.then( db => {
		return db.collection('Light');
	})
	.then( collection => {
		router.get('/', async (req, res, next) => {
			lightArray = await collection.find().toArray();
			res.render('index', {light: lightArray, title: 'light over time'});
		});
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('data_analysis', { title: 'Data Analysis' });
});

module.exports = router;
