var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var Book = require('../models/Book');

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

router.get('/assignCat', auth, (req,res,next)=>{
  res.render('book/assign-bookCat');
});

router.post('/assignCat', (req,res,next)=>{
  var category = new Category();
  category.main_cat = req.body.main_cat;
  category.sub_cat = req.body.sub_cat_i;
  category.save((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    res.redirect('/books/catList');
  });
});

router.get('/catList', auth,  (req,res,next)=>{
  Category.find((err,rtn)=>{
    if(err) throw err;
    res.render('book/bookCat-list',{cat:rtn});
  });
});

router.get('/add', auth, (req,res,next)=>{
  Category.find({},{'main_cat':1, _id:0, 'sub_cat':1},(err,rtn)=>{
    if (err) throw err;
    res.render('book/book-add',{cat:rtn});
  });
});

router.get('/list', auth, (req,res,next)=>{
  Book.find((err,rtn)=>{
    if (err) throw err;
    res.render('book/book-list',{book:rtn});
  });
});

router.post('/add', (req,res,next)=>{
  var book = new Book();
  book.book_name = req.body.book_name;
  book.main_cat = req.body.main_cat;
  book.sub_cat = req.body.sub_cat;
  book.book_author = req.body.book_author;
  book.pub_date = req.body.pub_date;
  book.book_range = req.body.book_range;
  book.barcode = req.body.barcode;

  book.save((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    res.redirect('/');
  });
});

module.exports = router;
