var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var user = require('./config/user');


/*
setting server and socket.io
 */
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var socket;

var port = 3000;
var host = 'localhost';

var getIOInstance = function() {
  return io;
};

var routes = require('./routes/index');
var users = require('./routes/users');
var trade = require('./routes/trade')(getIOInstance());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/trade', trade);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server.listen(port, host, function(){
  console.log('koscom-poc app listening on port 3000!');
});

/*
connecting socket.io
1. socket.on: listen from client
2. io.emit: send message to client
 */

io.on('connection', function(socketObj){
  socket = socketObj;
  console.log('user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('issuerChat', function(msg){
    console.log('user: ' + msg.user + ', message: ' + msg.message);
    io.emit('issuerChat', msg);
  });

  socket.on('receiverChat', function(msg){
    console.log('user: ' + msg.user + ', message: ' + msg.message);
    io.emit('receiverChat', msg);
  });
});

module.exports = app;
