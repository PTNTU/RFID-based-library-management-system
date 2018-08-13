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
  category.insertedBy = req.session.user.id;
  category.save((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    req.flash( 'success', 'Category is succefully created' );
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
  book.insertedBy = req.session.user.id;
  book.status = "00";
  book.save((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    req.flash( 'success', 'Book is succefully inserted' );
    res.redirect('/books/list');
  });
});

router.get('/detail/:id',auth,(req,res,next)=>{
  Category.find({},{'main_cat':1, _id:0, 'sub_cat':1},(err,cat)=>{
    if (err) throw err;
    Book.findOne({_id:req.params.id},(err,rtn)=>{
    console.log(rtn);
    res.render('book/book-detail',{book:rtn,cat:cat});
  });
});
});

router.post('/modify',(req,res,next)=>{
  var update ={
    book_name: req.body.book_name,
    main_cat: req.body.main_cat,
    sub_cat: req.body.sub_cat,
    book_author: req.body.book_author,
    pub_date : req.body.pub_date,
    book_range : req.body.book_range,
    barcode : req.body.barcode,
    status : req.body.status,
    updatedBy : req.session.user.id,
  }
  Book.findByIdAndUpdate(req.body.id,{$set:update},(err,rtn)=>{
    res.redirect('/books/detail/'+rtn._id);
  });
});

router.get('/catDetail/:id',auth,(req,res,next)=>{
  Category.findById(req.params.id,(err,rtn)=>{
    if(err) throw err;
    res.render('book/cat-detail', {cat:rtn})
  });
});

router.post('/modifyCat',(req,res,next)=>{
  var update = {
    main_cat:req.body.main_cat,
    sub_cat: req.body.sub_cat_i,
  }
  Category.findByIdAndUpdate(req.body.id,{$set:update},(err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    res.redirect('/Books/catDetail/'+rtn._id);
  });
});


router.get('/catDelete/:id',(req,res,next)=>{
  Category.findByIdAndRemove(req.params.id,(err,rtn)=>{
    if(err) throw err;
    console.log('rtn');
    res.redirect('/books/catList');
  })
});
router.get('/bookDelete/:id',(req,res,next)=>{
  Book.findByIdAndRemove(req.params.id,(err,rtn)=>{
    if(err) throw err;
    console.log('rtn');
    res.redirect('/books/list');
  })
});

router.post('/duplicate',(req,res,next)=>{
  Book.findOne({book_name:req.body.book},(err,rtn)=>{
    if(err) throw err;
    if(rtn != null) res.json({ status: false, msg: "Duplicate Book Name!!!"});
    else res.json({ status: true});
  })
});
module.exports = router;
