var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://raspberry:HackCUIV@172.31.94.195:27017/Project-IoT";
const dbname = "Project-IoT";

var index = require('./routes/index');
var users = require('./routes/users');
var developers = require('./routes/developers')
var data_analysis = require('./routes/data_analysis')

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server)

server.listen(80);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/developers', developers)
app.use('/users', users);
app.use('/data_analysis', data_analysis)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

setInterval(function(){
  MongoClient.connect(url)
    .then( db => {
      const temp = db.collection("Temperature");
      const humid = db.collection("Humidity");
      const light = db.collection("Light");
      return [temp, humid, light]
    })
    .then( async function(collection) {
        tempArray = await collection[0].find().toArray();
        humidArray = await collection[1].find().toArray();
        lightArray = await collection[2].find().toArray();
        console.log(lightArray)
        io.emit('data_push', 'hello!')
        return [tempArray, humidArray, lightArray]
    }).catch( err => {
      console.log("somethings up")
      console.log(err)
    })
}, 5000);

module.exports = app;
