var express = require('express');
var router = express.Router();
var Member = require('../models/Member');

/* GET users listing. */
router.get('/add', function(req, res, next) {
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
 member.status = "normal";

 member.save(function (err,rtn) {
   if(err) throw err;
   console.log(rtn);
   res.redirect('/members/list');
 });
});

router.get('/list', function(req, res, next) {
  Member.find(function (err,rtn) {
    if (err) throw err;
    res.render('member/member-list',{member:rtn});
  });

});

module.exports = router;
