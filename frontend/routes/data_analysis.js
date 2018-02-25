var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://raspberry:HackCUIV@172.31.94.195:27017/Project-IoT"

MongoClient.connect(url)
	.then( client => {
		var db = client.db("Project-IoT");
		var temp = db.collection("Temperature");
		var humid = db.collection("Humidity");
		var light = db.collection("Light");

		return [temp,humid,light];
	})
	.then( collections => {
		router.get('/', async (req, res, next) => {
			tempArray = await collections[0].find().toArray();
			humidArray = await collections[1].find().toArray();
			lightArray = await collections[2].find().toArray();
			res.render('data_analysis', {temp: tempArray, humid: humidArray, light: lightArray});
		});
	})
	.catch(err => {
		console.log(err);
	});

module.exports = router;
