var express = require('express');
var router = express.Router();
var Admin = require('../models/Admin');
var flash = require('express-flash');
var multer = require('multer');

var auth = function(req, res, next) {
  if (req.session.user) {
    return next();
  } else{
    req.flash('warn','You need to signin');
    console.log('request path:',req.path);
    console.log('req',req);
    req.flash('forward', req.path);
    res.redirect('/signin');
    }
};

/* GET home page. */
router.get('/',auth, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('commons/signup');
});

router.post('/signup', function(req, res, next) {
  var admin = new Admin();
  admin.name = req.body.name;
  admin.email = req.body.email;
  admin.password = req.body.password;
  admin.save((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    req.flash( 'success', 'Admin account succefully create' );
    res.redirect('/signin');
  });
});

router.get('/signin', function(req, res, next) {
  res.render('commons/signin');
});

router.post('/signin', function(req, res, next) {
  Admin.findOne({email:req.body.email},(err,admin)=>{
    if(err) throw err;
    if(admin == null || !Admin.compare(req.body.password,admin.password)){
      req.flash( 'warn', 'Email or ID not exists or password not matched!!' );
      res.redirect('/signin');
    }else {
      req.session.user = { name: admin.name, email: admin.email, id: admin._id };
      res.redirect((req.body.forward)? req.body.forward : '/');
      console.log(req.session.user);
    }
  });
});
module.exports = router;
