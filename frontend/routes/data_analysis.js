var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://raspberry:HackCUIV@172.31.94.195:27017/Project-IoT"

MongoClient.connect(url, function(err, client) {
	assert.equal(null, err);
	console.log("Connected securely to server");

	const db = client.db("Project-IoT");

	const temp = db.collection("Temperature");
	const humid = db.collection("Humidity");
	const light = db.collection("Light");

	var tempArray = await temp.find({}).next(function(err, documents) {return documents});
	console.log(tempArray)
	var humidArray = await humid.find({}).next(function(err, documents) {return documents});
	console.log(humidArray)
	var lightArray = await light.find({}).next(function(err, documents) {return documents});
	console.log(lightArray)

	router.get('/', async (req, res, next) => {
		tempArray = await collections[0].find().toArray( docs => {
			res.render('data_analysis', {temp: docs})
		});
	});
});

module.exports = router;
