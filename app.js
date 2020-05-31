var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addDriverRouter = require('./routes/addDriver');
var validateUserRouter = require('./routes/validateUser');
var queryDriversRouter = require('./routes/queryDrivers');
var getDriverDataRouter = require('./routes/getDriverData');

// Markos Function
var setRouter = require('./routes/set');
var getRouter = require('./routes/get');
var clearDriverRouter = require('./routes/clearDriver');
var finalizeDriverRouter = require('./routes/finalizeDriver');
var addEligibleDriverRouter = require('./routes/addEligibleDriver');
var returnDriverArrayRouter = require('./routes/returnDriverArray');
var setUserConfirmationRouter = require('./routes/setUserConfirmation');
var setCostRouter = require('./routes/setCost');
//var setDriverConfimationRouter = require('./routes/setDriverConfimation');
var finalizeTripRouter = require('./routes/finalizeTrip');
var stageDriverStatusRouter = require ('./routes/stageDriverStatus');
var clearDriverStatusRouter = require ('./routes/clearDriverStatus');
var returnDriverStatusRouter = require ('./routes/returnDriverStatus');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addDriver', addDriverRouter);
app.use('/validateUser', validateUserRouter);
app.use('/queryDrivers', queryDriversRouter);
app.use('/getDriverData', getDriverDataRouter);
app.use('/set', setRouter);
app.use('/get', getRouter);
app.use('/clearDriver', clearDriverRouter);
app.use('/finalizeDriver', finalizeDriverRouter);
app.use('/addEligibleDriver', addEligibleDriverRouter);
app.use('/returnDriverArray', returnDriverArrayRouter);
app.use('/setUserConfirmation', setUserConfirmationRouter);
app.use('/setCost', setCostRouter)
app.use('/setDriverConfirmation', setUserConfirmationRouter);
app.use('/finalizeTrip', finalizeTripRouter);
app.use('/stageDriverStatus', stageDriverStatusRouter);
app.use('/clearDriverStatus', clearDriverStatusRouter);
app.use('/returnDriverStatus', returnDriverStatusRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
