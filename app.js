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
const hbs = require('hbs')

//passport config
require('./config/passport')(passport)

var indexRouter = require('./routes/index');
var user = require('./routes/user')
var app = express();

mongoose.connect('mongodb://localhost:27017/shoping',   
  {useNewUrlParser:true, 
  useUnifiedTopology: true})
  .then(()=>console.log('mongodb connected'))
  .catch(()=>console.log('some error occured in connection'))
  

require('./config/passport')
// view engine setup
app.engine('.hbs',expresshbs({defaultLayout:'layout', extname:'.hbs'}))
app.set('view engine', '.hbs');

// app.set('view engine', 'hbs')
// app.set('views', temp)


//Body parser

app.use(express.urlencoded({extended:false}))

//Express-session

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,

}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//Global var

app.use((req, res, next)=>
{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
 next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'mysupersecrate', resave:false, saveUninitialized:false}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', user);


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
