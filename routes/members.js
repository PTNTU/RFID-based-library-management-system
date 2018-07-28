var express = require('express');
var router = express.Router();
var Member = require('../models/Member');

var auth = function(req, res, next) {
  if (req.session.user) {
    return next();
  } else{
    req.flash('warn','You need to signin');
    console.log('request path',req.originalUrl);
    req.flash('forward', req.originalUrl);
    res.redirect('/signin');
    }
};

/* GET users listing. */
router.get('/add',auth, function(req, res, next) {
  res.render('member/member-add');
});

router.post('/add',function (req,res,next) {
 var member = new Member();
 member.name = req.body.username;
 member.phone = req.body.phoneus;
 member.password = req.body.password;
 member.major = req.body.major;
 member.year = req.body.year;
 member.roleNo = req.body.role;
 member.rfid = req.body.rfid;
 member.status = "00";
 member.insertedBy = req.session.user.id;

 member.save(function (err,rtn) {
   if(err) throw err;
   console.log(rtn);
   res.redirect('/members/list');
 });
});

router.get('/list',auth, function(req, res, next) {
  Member.find(function (err,rtn) {
    if (err) throw err;
    res.render('member/member-list',{member:rtn});
  });
});

router.post('/modify',(req,res,next)=>{
  var update ={
    name: req.body.username,
    major: req.body.major,
    year: req.body.year,
    roleNo: req.body.role,
    phone : req.body.phoneus,
    rfid : req.body.rfid,
    status : req.body.status,
    updatedBy : req.session.user.id,
  }
  Member.findByIdAndUpdate(req.body.id,{$set:update},(err,rtn)=>{
    res.redirect('/members/detail/'+rtn._id);
  });
});

router.get('/detail/:id',auth,(req,res,next)=>{
  Member.findOne({_id:req.params.id},(err,rtn)=>{
    console.log(rtn);
    res.render('member/member-detail',{member:rtn});
  });
});

router.get('/memberDelete/:id',(req,res,next)=>{
  Member.findByIdAndRemove(req.params.id,(err,rtn)=>{
    if(err) throw err;
    console.log('rtn');
    res.redirect('/members/list');
  })
});
module.exports = router;
