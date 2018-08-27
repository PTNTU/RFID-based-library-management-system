var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var Book = require('../models/Book');
var Member = require('../models/Member');
var Record = require('../models/Record');
var mongoose = require('mongoose');
// 
// var server = http.createServer().listen(config.stream.socketPort);
// var serverIo = require('socket.io')(server);

var auth = function(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    req.flash('warn', 'You need to signin');
    console.log('request path', req.originalUrl);
    req.flash('forward', req.originalUrl);
    res.redirect('/signin');
  }
};

router.get('/assignCat', auth, (req, res, next) => {
  res.render('book/assign-bookCat');
});

router.post('/assignCat', (req, res, next) => {
  var category = new Category();
  category.main_cat = req.body.main_cat;
  category.sub_cat = req.body.sub_cat_i;
  category.insertedBy = req.session.user.id;
  category.save((err, rtn) => {
    if (err) throw err;
    console.log(rtn);
    req.flash('success', 'Category is succefully created');
    res.redirect('/books/catList');
  });
});

router.get('/catList', auth, (req, res, next) => {
  Category.find((err, rtn) => {
    if (err) throw err;
    res.render('book/bookCat-list', {
      cat: rtn
    });
  });
});

router.get('/add', auth, (req, res, next) => {
  Category.find({}, {
    'main_cat': 1,
    _id: 0,
    'sub_cat': 1
  }, (err, rtn) => {
    if (err) throw err;
    res.render('book/book-add', {
      cat: rtn
    });
  });
});

router.get('/list', auth, (req, res, next) => {
  Book.find((err, rtn) => {
    if (err) throw err;
    res.render('book/book-list', {
      book: rtn
    });
  });
});

router.post('/add', (req, res, next) => {
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
  book.save((err, rtn) => {
    if (err) throw err;
    console.log(rtn);
    req.flash('success', 'Book is succefully inserted');
    res.redirect('/books/list');
  });
});

router.get('/detail/:id', auth, (req, res, next) => {
  Category.find({}, {
    'main_cat': 1,
    _id: 0,
    'sub_cat': 1
  }, (err, cat) => {
    if (err) throw err;
    Book.findOne({
      _id: req.params.id
    }, (err, rtn) => {
      console.log(rtn);
      res.render('book/book-detail', {
        book: rtn,
        cat: cat
      });
    });
  });
});

router.post('/modify', (req, res, next) => {
  var update = {
    book_name: req.body.book_name,
    main_cat: req.body.main_cat,
    sub_cat: req.body.sub_cat,
    book_author: req.body.book_author,
    pub_date: req.body.pub_date,
    book_range: req.body.book_range,
    barcode: req.body.barcode,
    status: req.body.status,
    updatedBy: req.session.user.id,
  }
  Book.findByIdAndUpdate(req.body.id, {
    $set: update
  }, (err, rtn) => {
    res.redirect('/books/detail/' + rtn._id);
  });
});

router.get('/catDetail/:id', auth, (req, res, next) => {
  Category.findById(req.params.id, (err, rtn) => {
    if (err) throw err;
    res.render('book/cat-detail', {
      cat: rtn
    })
  });
});

router.post('/modifyCat', (req, res, next) => {
  var update = {
    main_cat: req.body.main_cat,
    sub_cat: req.body.sub_cat_i,
  }
  Category.findByIdAndUpdate(req.body.id, {
    $set: update
  }, (err, rtn) => {
    if (err) throw err;
    console.log(rtn);
    res.redirect('/Books/catDetail/' + rtn._id);
  });
});


router.get('/catDelete/:id', (req, res, next) => {
  Category.findByIdAndRemove(req.params.id, (err, rtn) => {
    if (err) throw err;
    console.log('rtn');
    res.redirect('/books/catList');
  })
});
router.get('/bookDelete/:id', (req, res, next) => {
  Book.findByIdAndRemove(req.params.id, (err, rtn) => {
    if (err) throw err;
    console.log('rtn');
    res.redirect('/books/list');
  })
});

router.post('/duplicate', (req, res, next) => {
  Book.findOne({
    book_name: req.body.book
  }, (err, rtn) => {
    if (err) throw err;
    if (rtn != null) res.json({
      status: false,
      msg: "Duplicate Book Name!!!"
    });
    else res.json({
      status: true
    });
  })
});

router.get('/record/:id', auth, (req, res, next) => {
  Member.findOne({
    rfid: req.params.id
  }, (err, mem) => {
    if (err) throw err;
    console.log('sts', typeof mem.last_act);
    Record.findOne({
      member_id: mem._id,
      status: mem.last_act
    }, (err2, rec) => {
      console.log('//////', rec);
      if (err2) throw err2;
      console.log(rec);
      res.render('book/book-record', {
        member: mem,
          record: (rec == null) ? "0" : rec
      });
    });
  });
});

router.post('/barcheck', (req, res, next) => {
  Book.findOne({
    barcode: req.body.barcode,
    status: "00"
  }, (err, book) => {
    if (err) throw err;
    if (book != null) res.json({
      status: true,
      msg: "Member card succefully scan!!",
      book: book
    });
    else res.json({
      status: false,
      msg: "Book is not avaliable now",
      book: book
    });
  });
});

router.post('/pwdcheck', (req, res, next) => {
  Member.findById(req.body.mem, (err, member) => {
    if (err) throw err;
    if (member == null || !Member.compare(req.body.pwd,member.password)) res.json({
      status: false,
      msg: "Member's Password Not Match!!"
    });
    else res.json({
      status: true,
      msg: "Welcome Member",
    });
  });
});

router.post('/borrow', (req, res, next) => {
  var keys = []
  Member.findByIdAndUpdate(req.body.mem, {
    $set: {
      last_borrow: Date.now(),
      _id: req.body.mem,
      last_act: "00"
    }
  }, {
    new: true
  }, (err3, upd) => {
    if (err3) throw err3;
    var record = new Record();
    console.log('don1', upd);
    record.member_id = upd._id;
    record.type = "00";
    record.status = "00";
    record.borrowed = Date.now();
    record.borrowedBy = req.session.user.id;
    record.tol_range = req.body.tol_dur;
    var keys = JSON.parse(req.body.bor);

    console.log(keys);
    console.log(typeof keys, keys);
    // TODO check borrowed book and return warning message
    Book.update({
      _id: {
        $in: keys
      }
    }, {
      $set: {
        status: "01"
      }
    },{
      multi: true
    },function(err, rtn) {
      if (err) throw err;
      console.log('book borrowed',rtn);
      Book.find({
        _id: {
          $in: keys
        }
      }, (err, book) => {
        if (err) throw err;
        for (var y in book) {
          record.books.push({
            book_id: book[y]._id,
            range: book[y].book_range,
            name: book[y].book_name,
            author: book[y].book_author,
            barcode: book[y].barcode
          });
        }
        record.save((err2, rtn) => {
          if (err2) throw err2;
          res.json({
            status: true,
            msg: "Book Borrowing process is succefully complete!!"
          });
        });
      });
    });

  });

});

router.post('/return/:id', (req, res, next) => {
  var update = {
    type: "01",
    status: "01",
    received: Date.now(),
    receivedBy: req.session.user.id
  }
  var idx = [];
  Record.findByIdAndUpdate(req.params.id, {
    $set: update
  }, (err, rec) => {
    if (err) throw err;
    console.log('This is book from',rec.books);
    for (var y = 0; rec.books.length > y; y++) {
      console.log('call');
      idx.push(rec.books[y].book_id);
    }
    console.log(typeof idx, idx);
    for(var i in idx){
      idx[i] = mongoose.Types.ObjectId(idx[i]);
      console.log(idx[i], typeof idx[i]);
    }

    Book.update({
      _id: {
        $in: idx
      }
    }, {
      $set: {
        status: "00"
      }
    },{
      multi: true
    }, function(err, rtn) {
      if (err) throw err;
      console.log('book updated',rtn);
      Member.findByIdAndUpdate(rec.member_id, {
        $set: {
          last_borrow: Date.now(),
          _id: rec.member_id,
          last_act: "01"
        }
      }, {
        new: true
      }, (err3, upd) => {
        if (err3) throw err3;
        res.json({
          status: true,
          msg: "Book retrun process is complete!!!",
          rec: rec
        });
      });
    });

  })
});

router.get('/history', (req, res) => {
  var key = [];
  // TODO need pages
  Record.find({}).limit(10).populate('member_id').exec((err, rtn) => {
    if (err) throw err;
    console.log(rtn);
    res.render('book/book-history', {
      hist: rtn
    });
  });
});

module.exports = router;
