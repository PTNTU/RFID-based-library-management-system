var express = require('express');
var router = express.Router();
var Student = require('../models/Student');
var Admin = require('../models/Admin');
var timeAgo = require('node-time-ago');

/* GET users listing. */
router.get('/add', function(req, res, next) {
  console.log('call');
  res.render('student/student-add');
});

router.post('/add',function (req,res,next) {
 var student = new Student();
 student.ent_no = req.body.ent_no;
 student.name = req.body.username;
 student.phone = req.body.phoneus;
 student.password = req.body.password;
 student.major = req.body.major;
 student.year = req.body.year;
 student.roleNo = req.body.role;
 student.ac_year = req.body.acyear;
 student.insertedBy = req.session.user.id;

 student.save(function (err,rtn) {
   if(err) throw err;
   console.log(rtn);
   res.redirect('/students/list');
 });
});

router.get('/list', function(req, res, next) {
  Student.find(function (err,rtn) {
    if (err) throw err;
    res.render('student/student-list',{student:rtn});
  });
});
//
// router.get('/warn', function(req, res, next) {
//   Member.find({status:"01"},function (err,rtn) {
//     if (err) throw err;
//     time =[];
//     for(var i in rtn){
//       time.push(timeAgo(rtn[i].updated))
//     }
//     res.render('member/member-warn',{member:rtn, time:time});
//   });
// });
//
router.post('/modify',(req,res,next)=>{
  var update ={
    name: req.body.username,
    major: req.body.major,
    year: req.body.year,
    roleNo: req.body.role,
    phone : req.body.phoneus,
    ent_no : req.body.ent_no,
    ac_year : req.body.acyear,
    updatedBy : req.session.user.id,
    updated: Date.now()
  }
  Student.findByIdAndUpdate(req.body.id,{$set:update},(err,rtn)=>{
    res.redirect('/students/detail/'+rtn._id);
  });
});
//
router.get('/modify/:id',(req,res,next)=>{
  Student.findOne({_id:req.params.id},(err,rtn)=>{
    console.log(rtn);
    res.render('student/student-modify',{student:rtn,timeago: timeAgo(rtn.instered)});
  });
});

router.get('/detail/:id',(req,res,next)=>{
  Student.findOne({_id:req.params.id},(err,rtn)=>{
    console.log(rtn);
    res.render('student/student-detail',{student:rtn,timeago: timeAgo(rtn.instered)});
  });
});
//
// router.get('/memberDelete/:id',(req,res,next)=>{
//   Member.findByIdAndRemove(req.params.id,(err,rtn)=>{
//     if(err) throw err;
//     console.log('rtn');
//     res.redirect('/members/list');
//   })
// });
//
// router.post('/admcheck',(req,res,next)=>{
//   Admin.findById(req.body.id,(err,admin)=>{
//     if(err) throw err;
//     if(admin == null || !Admin.compare(req.body.pwd,admin.password)){
//       res.json({ status: false, msg: "Password not matched"});
//     }else{
//       res.json({ status: true, msg: "Password matched"});
//     }
//   });
// });
//
// router.post('/memcheck',(req,res,next)=>{
//   Member.findById(req.body.id,(err,member)=>{
//     if(err) throw err;
//     if(member == null || !Member.compare(req.body.pwd,member.password)){
//       res.json({ status: false, msg: "Password not matched"});
//     }else{
//       res.json({ status: true, msg: "Password matched"});
//     }
//   });
// });

router.post('/duplicate',(req,res,next)=>{
  Student.findOne({$or:[{ent_no:req.body.ent_no},{$and:[{major:req.body.major},{year:req.body.year},{roleNo:req.body.role}]}]},(err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    if(rtn != null) res.json({ status: false, msg: "Duplicate Entery no or member data"});
    else res.json({ status: true});
  })
});

// router.post('/duplicateMo',(req,res,next)=>{
//   Student.findOne({$and:[{major:req.body.major},{year:req.body.year},{roleNo:req.body.role}]},(err,rtn)=>{
//     if(err) throw err;
//     console.log(rtn);
//     if(rtn != null) res.json({ status: false, msg: "Duplicate Entery no or member data"});
//     else res.json({ status: true});
//   })
// });

// router.get('/auth', function(req, res, next) {
//   res.render("member/member-auth");
// });
//
// router.post('/authcheck',(req,res,next)=>{
//   console.log(req.body.rfid);
//   Member.findOne({rfid:req.body.rfid},(err,rtn)=>{
//     if(err) throw err;
//     console.log(rtn);
//     if(rtn != null) res.json({ status: true, msg: "Member card succefully scan!!"});
//     else res.json({ status: false, msg: "Member card is not registered"});
//   })
// })

module.exports = router;
