var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('data_analysis', { title: 'Data Analysis' });
});

module.exports = router;
