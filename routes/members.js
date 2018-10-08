var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Admin = require('../models/Admin');
var Student = require('../models/Student');
var Staff = require('../models/Staff');
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

router.post('/addstaff',function (req,res,next) {
 var staff = new Staff();
 staff.name = req.body.username;
 staff.password = req.body.passwordsf;
 staff.rfid = req.body.rfidsf;
 staff.phone = req.body.phone;
 staff.dept = req.body.dept;
 staff.ocp = req.body.ocp;
 staff.insertedBy = req.session.user.id;

 staff.save(function (err,rtn) {
   if(err) throw err;
   console.log(rtn);
   res.redirect('/members/listsf');
 });
});

router.get('/list', function(req, res, next) {
  Member.find({}).populate('ent_id').exec(function (err,rtn) {
    if (err) throw err;
    res.render('member/member-list',{member:rtn});
  });
});

router.get('/listsf', function(req, res, next) {
  Staff.find({},function (err,rtn) {
    if (err) throw err;
    res.render('member/member-listsf',{member:rtn});
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

router.get('/warnstf', function(req, res, next) {
  Staff.find({status:"01"},function (err,rtn) {
    if (err) throw err;
    time =[];
    for(var i in rtn){
      time.push(timeAgo(rtn[i].updated))
    }
    res.render('member/member-warnstf',{member:rtn, time:time});
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

router.post('/modifystf',(req,res,next)=>{
  var update ={
    name: req.body.username,
    phone: req.body.phone,
    rfid : req.body.rfid,
    // ocp:  req.body.ocp,
    status : req.body.status,
    updatedBy : req.session.user.id,
    updated: Date.now()
  }
  Staff.findByIdAndUpdate(req.body.id,{$set:update},(err,rtn)=>{
    res.redirect('/members/detailsf/'+rtn._id);
  });
});

router.get('/detail/:id',(req,res,next)=>{
  Member.findOne({_id:req.params.id}).populate('ent_id').exec((err,rtn)=>{
    console.log(rtn);
    res.render('member/member-detail',{member:rtn,timeago: timeAgo(rtn.instered)});
  });
});

router.get('/detailsf/:id',(req,res,next)=>{
  Staff.findOne({_id:req.params.id},(err,rtn)=>{
    console.log(rtn);
    res.render('member/member-detailstf',{staff:rtn,timeago: timeAgo(rtn.instered)});
  });
});

router.get('/memberDelete/:id',(req,res,next)=>{
  Member.findByIdAndRemove(req.params.id,(err,rtn)=>{
    if(err) throw err;
    console.log('rtn');
    res.redirect('/members/list');
  })
});

router.get('/memberDeletestf/:id',(req,res,next)=>{
  Staff.findByIdAndRemove(req.params.id,(err,rtn)=>{
    if(err) throw err;
    console.log('rtn');
    res.redirect('/members/liststf');
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
  var query1;
  var query2;
  if(req.body.type == '01'){
     query1 = {$or:[{ent_no:req.body.ent_no},{rfid:req.body.rfid}]};
     query2 = {rfid:req.body.rfid};
     console.log('This is member');
  }else {
    query1 = {rfid:req.body.rfid};
    query2 = {rfid:req.body.rfid};
    console.log('this is staff');
  }
  console.log(query1,query2);
  Member.findOne(query1,(err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    if(rtn != null) {
      res.json({ status: false, msg: "Duplicate Entery No. Or RFID card!!"});
    }else {
      console.log('not find in member');
        Staff.findOne(query2,(err2,rtn2)=>{
          if(err2) throw err2;
          if(rtn2 != null) {
            res.json({ status: false, msg: "Duplicate Entery No. Or RFID card!!"});
          }else {
            console.log('not find in staff');
            res.json({ status: true});
          }
        });
        }
  });
});

router.get('/auth', function(req, res, next) {
  res.render("member/member-auth");
});

router.get('/authstf', function(req, res, next) {
  res.render("member/member-authstf");
});

router.get('/liststf', function(req, res, next) {
  Staff.find({},(err,rtn)=>{
    res.render("member/member-listsf",{member:rtn});
  })

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

router.post('/authcheckstf',(req,res,next)=>{
  console.log(req.body.rfid);
  Staff.findOne({rfid:req.body.rfid},(err,rtn)=>{
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
