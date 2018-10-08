var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Admin = require('../models/Admin');
var Student = require('../models/Student');
var Staff = require('../models/Staff');
var Book = require('../models/Book');
var Record = require('../models/Record');
var Category = require('../models/Category');
var timeAgo = require('node-time-ago');

/* GET users listing. */
router.get('/home', function(req, res, next) {
  Member.count({},(err,rtn)=>{
    if(err) throw err;
    Student.count({},(err2,rtn2)=>{
      if(err2) throw err2
      Staff.count({},(err3,rtn3)=>{
        if(err3) throw err3;
        Book.find({}).sort({count:-1}).limit(4).exec((err4,rtn4)=>{
          if(err4) throw err4;
          res.render('users/home',{staff:rtn3,member:rtn,student:rtn2,blist:rtn4});
        });
      });
    });
  });

});

router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.post('/login', function(req, res, next) {
  Member.findOne({rfid:req.body.rfid},(err,rtn)=>{
    if(err) throw err;
    if(rtn == null || !Member.compare(req.body.password,rtn.password)){
      res.render('users/login');
    }else {
      req.session.stu = {rfid: rtn.rfid};
      res.redirect('/users/student/home/'+rtn._id);
    }
  });

});

router.get('/student/home/:id', function(req, res, next) {
  Member.findOne({_id:req.params.id}).populate('ent_id').exec((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    Record.find({member_id:req.params.id}).sort({updated:-1}).exec((err2,rtn2)=>{
      if(err2) throw err2;
      console.log(rtn2);
      res.render('users/student-home',{student:rtn,record:rtn2,ses:req.session.stu});
    });
  });
});

router.get('/staff/home/:id', function(req, res, next) {
  Staff.findOne({_id:req.params.id},(err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    Record.find({staff_id:req.params.id}).sort({updated:-1}).exec((err2,rtn2)=>{
      if(err2) throw err2;
      console.log(rtn2);
      res.render('users/staff-home',{staff:rtn,record:rtn2,ses:req.session.tea});
    });
  });
});

router.get('/student/recordDetail/:id',function (req,res,next) {
  Record.findById(req.params.id,(err,rtn)=>{
    if(err) throw err;
    console.log('////',rtn);
    res.render('users/record-list',{record:rtn});
  });

});

router.get('/signin', function(req, res, next) {
  res.render('users/signin');
});

router.post('/signin', function(req, res, next) {
  console.log('call');
  Staff.findOne({rfid:req.body.rfid},(err,rtn)=>{
    if(err) throw err;
    if(rtn == null || !Staff.compare(req.body.password,rtn.password)){
      res.render('users/signin');
    }else {
      req.session.tea = {rfid: rtn.rfid};
      res.redirect('/users/staff/home/'+rtn._id);

    }
  });

});

router.get('/library', function(req, res, next) {
  Book.find({}).sort({count:-1}).limit(2).exec((err,rtn)=>{
    if(err) throw err;
    console.log('///',rtn);
    Book.find({}).sort({count:-1}).limit(20).exec((err2,rtn2)=>{
      res.render('users/library',{top:rtn,list:rtn2});
    });
  });

});

router.all('/bookList', function(req, res, next) {
  var key = [req.body.category||'',req.body.sort||"1",req.body.keyword||''];
  var sort = (key[1] == "1")? {instered: -1} :(key[1] == "2")? {instered: 1}: {count:-1};
  console.log(key,sort);
  var query = {$and : [{main_cat:{ '$regex' : key[0], '$options' : 'i' }},{$or : [{book_name:{ '$regex' : key[2], '$options' : 'i' }},{book_author:{ '$regex' : key[2], '$options' : 'i' }}]}]};
  Category.find({},(err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    Book.find(query).sort(sort).exec((err2,rtn2)=>{
      if(err2) throw err2;
      console.log(rtn2);
      res.render('users/book-list',{cat:rtn,book:rtn2,key:key});
    })

  });
});

router.get('/bookDetail/:id', function(req, res, next) {
  Book.findById(req.params.id,(err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    res.render('users/book-detail',{book:rtn});
  });

});

router.get('/logout',function (req,res) {
  req.session.destroy();
  res.redirect('/users/home');
});


module.exports = router;
