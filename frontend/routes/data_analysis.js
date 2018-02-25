var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb://raspberry:HackCUIV@172.31.94.195:27017/Project-IoT";
const dbname = "Project-IoT";

(async function() {
	let client;

	try {
		client = await MongoClient.connect(url);
		console.log("Connected securely to server");

		const db = client.db(dbname);

		const temp = db.collection("Temperature");
		const humid = db.collection("Humidity");
		const light = db.collection("Light");

		router.get('/', async (req, res, next) => {

			var tempArray = await temp.find({}).toArray();
			console.log(tempArray)
			var humidArray = await humid.find({}).toArray();
			console.log(humidArray)
			var lightArray = await light.find({}).toArray();
			console.log(lightArray)

			res.render('data_analysis', {temp: docs})
		});

	} catch (err) {
		console.log(err.stack)
	}
	client.close();
});

module.exports = router;
