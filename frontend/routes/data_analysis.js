var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://raspberry:HackCUIV@172.31.94.195:27017/Project-IoT";
const dbname = "Project-IoT";

MongoClient.connect(url)
	.then( db => {
		const temp = db.collection("Temperature");
		const humid = db.collection("Humidity");
		const light = db.collection("Light");
		return [temp, humid, light]
	})
	.then( collection => {
		router.get('/', async (req, res, next) => {
			tempArray = await collection[0].find().toArray();
			humidArray = await collection[1].find().toArray();
			lightArray = await collection[2].find().toArray();

			res.render('data_analysis', {temp: tempArray, humid: humidArray, light: lightArray});
		});
	})
	.catch( err => {
		console.log(err);
	});

module.exports = router;
