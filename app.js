var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('express-flash');

var indexRouter = require('./routes/index');
var memberRouter = require('./routes/members');
var bookRouter = require('./routes/books');
var studentRouter = require('./routes/students');
var userRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/cropperjs/dist'));
app.use('/css', express.static(__dirname + '/node_modules/cropper/dist'));
app.use('/js', express.static(__dirname + '/node_modules/jquery-cropper/dist'));

mongoose.connect('mongodb://127.0.0.1/librarydb'); // studydb is anyname can insert
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));

//session : before routing
    app.use(session({
          secret: '@#$Th!$@$M@ar4L18R2r4,',// any string for security
          resave: false,
          saveUninitialized : true
}));
app.use(flash()); // after cookie, session

app.use(function (req,res,next) {
  res.locals.user = req.session.user;
  next();
});
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use(function (req, res, next) {
  // res.locals.active = req.path;
  console.log('user path', req.path);
  if(req.session.user){
    next();
  }else{
    req.flash("warning", "Authorization failed! Please login");
    req.flash('forward', req.path);
    res.redirect('/signin');
  }

});


app.use('/members', memberRouter);
app.use('/books', bookRouter);
app.use('/students', studentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error ajax
app.use(function(err, req, res, next){
  if(req.xhr){
    res.status(err.status || 500).send(err.message);
  } else{
    next(err);
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'+ ((err.status == 404)?'-404':''));
});

module.exports = app;
