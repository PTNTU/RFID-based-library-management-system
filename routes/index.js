var express = require('express');
var router = express.Router();
var Admin = require('../models/Admin');
var flash = require('express-flash');
var Category = require('../models/Category');
var Book = require('../models/Book');
var Member = require('../models/Member');
var multer = require('multer');

var auth = function(req, res, next) {
  if (req.session.user) {
    return next();
  } else{
    req.flash('warn','You need to signin');
    req.flash('forward', req.path);
    res.redirect('/signin');
    }
};

/* GET home page. */
router.get('/',auth, function(req, res, next) {
  Category.count({},(err,catCount)=>{
    if(err) throw err;
    Book.count({},(err2, bCount)=>{
      if(err2) throw err2;
      Member.count({},(err3, mCount)=>{
        if(err3) throw err3;
        Book.count({status: '01'},(err,brCount)=>{
          res.render('index', { catCount: catCount, bookCounnt: bCount, memCount: mCount, brCount:brCount });
        });
      });
    })
  });
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
    console.log(admin);
    if(admin == null || !Admin.compare(req.body.password,admin.password)){

      req.flash( 'warn', 'Email not exists or password not matched!!' );
      res.redirect('/signin');
    }else {
      var user_cookie = {name:admin.name,id:admin._id, email:admin.email};
      res.cookie('user_cookie', user_cookie);
      req.session.user = { name: admin.name, email: admin.email, id: admin._id };
      res.redirect((req.body.forward)? req.body.forward : '/');
      console.log(req.session.user);
    }
  });
});

router.get('/profile',auth, (req,res,next)=>{
  Admin.findById(req.session.user.id,(err,rtn)=>{
    if(err) throw err;
    res.render('commons/admin-detail',{admin:rtn});
  });
});

router.get('/signout',function (req,res) {
  req.session.destroy();
  res.redirect('/');
});
router.post('/profile/checkpwd',(req,res,next)=>{
  console.log('work post');
  Admin.findById(req.session.user.id,(err,rtn)=>{
    if(err) throw err;
    console.log('find admin');
    if(!Admin.compare(req.body.oldPass,rtn.password)) res.json({ status: false, msg: 'Old Password is not correct'});
    else res.json({ status: true});
  });
});

router.post('/profile',(req,res,next)=>{
    Admin.findById(req.body.id,(err,admin)=>{
    if(err) throw err;
      admin.name= req.body.name;
      admin.email= req.body.email;
      admin.password= req.body.password;
      admin.save((err,rtn)=>{
        if(err) throw err;
        console.log(rtn);
        res.redirect('/profile');
      });
  });
});

router.post('/signup/duplicate',(req,res,next)=>{
  Admin.findOne({email:req.body.email},(err,rtn)=>{
    if(err) throw err;
    if(rtn != null) res.json({ status: false, msg: "Duplicate email!!!"});
    else res.json({ status: true});
  })
});


module.exports = router;
