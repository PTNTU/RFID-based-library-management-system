var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Admin = require('../models/Admin');
var Student = require('../models/Student');
var timeAgo = require('node-time-ago');

/* GET users listing. */
router.get('/add', function(req, res, next) {
  res.render('member/member-add');
});

router.post('/add',function (req,res,next) {
 var member = new Member();
 member.ent_id = req.body.ent_id;
 member.password = req.body.password;
 member.rfid = req.body.rfid;
 member.insertedBy = req.session.user.id;

 member.save(function (err,rtn) {
   if(err) throw err;
   console.log(rtn);
   res.redirect('/members/list');
 });
});

router.get('/list', function(req, res, next) {
  Member.find({}).populate('ent_id').exec(function (err,rtn) {
    if (err) throw err;
    res.render('member/member-list',{member:rtn});
  });
});

router.get('/warn', function(req, res, next) {
  Member.find({status:"01"}).populate('ent_id').exec(function (err,rtn) {
    if (err) throw err;
    time =[];
    for(var i in rtn){
      time.push(timeAgo(rtn[i].updated))
    }
    res.render('member/member-warn',{member:rtn, time:time});
  });
});

router.post('/modify',(req,res,next)=>{
  var update ={
    rfid : req.body.rfid,
    status : req.body.status,
    updatedBy : req.session.user.id,
    updated: Date.now()
  }
  Member.findByIdAndUpdate(req.body.id,{$set:update},(err,rtn)=>{
    res.redirect('/members/detail/'+rtn._id);
  });
});

router.get('/detail/:id',(req,res,next)=>{
  Member.findOne({_id:req.params.id}).populate('ent_id').exec((err,rtn)=>{
    console.log(rtn);
    res.render('member/member-detail',{member:rtn,timeago: timeAgo(rtn.instered)});
  });
});

router.get('/memberDelete/:id',(req,res,next)=>{
  Member.findByIdAndRemove(req.params.id,(err,rtn)=>{
    if(err) throw err;
    console.log('rtn');
    res.redirect('/members/list');
  })
});

router.post('/admcheck',(req,res,next)=>{
  Admin.findById(req.body.id,(err,admin)=>{
    if(err) throw err;
    if(admin == null || !Admin.compare(req.body.pwd,admin.password)){
      res.json({ status: false, msg: "Password not matched"});
    }else{
      res.json({ status: true, msg: "Password matched"});
    }
  });
});

router.post('/memcheck',(req,res,next)=>{
  Member.findById(req.body.id,(err,member)=>{
    if(err) throw err;
    if(member == null || !Member.compare(req.body.pwd,member.password)){
      res.json({ status: false, msg: "Password not matched"});
    }else{
      res.json({ status: true, msg: "Password matched"});
    }
  });
});

router.post('/duplicate',(req,res,next)=>{
  Member.findOne({$or:[{ent_no:req.body.ent_no},{rfid:req.body.rfid}]},(err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    if(rtn != null) res.json({ status: false, msg: "Duplicate Entery No. Or RFID card!!"});
    else res.json({ status: true});
  })
});

router.get('/auth', function(req, res, next) {
  res.render("member/member-auth");
});

router.post('/authcheck',(req,res,next)=>{
  console.log(req.body.rfid);
  Member.findOne({rfid:req.body.rfid}).populate('ent_id').exec((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    if(rtn != null) res.json({ status: true, msg: "Member card succefully scan!!"});
    else res.json({ status: false, msg: "Member card is not registered"});
  });
});

router.post('/checkentery',(req,res)=>{
  Student.findOne({ent_no:req.body.ent_no},(err,rtn)=>{
    if(err) throw err;
    if(rtn != null) res.json({status: true, msg: "Student account exist!!", student:rtn});
    else res.json({ status: false, msg: "Member is not exist"});
  });
});

module.exports = router;
