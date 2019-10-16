var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = require('mongodb')
const expresshbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')


var indexRouter = require('./routes/index');
var app = express();

mongoose.connect('mongodb://localhost:27017/shoping', {useNewUrlParser:true, useUnifiedTopology: true},(error, client)=>{
  if(error){
    console.log(error)
  }

})

require('./config/passport')
// view engine setup
app.engine('.hbs',expresshbs({defaultLayout:'layout', extname:'.hbs'}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'mysupersecrate', resave:false, saveUninitialized:false}))
app.use(flash)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// app.get('/user/signup',(req,res)=>{
//   res.render('user/signup')
// })

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
