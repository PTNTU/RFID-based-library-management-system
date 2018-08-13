var mongoose = require('mongoose'); //mongodb module
var dateformat = require('dateformat');

var Schema = mongoose.Schema;
var BookSchema = new Schema({
  book_name: {
    type: String,
    required: true,
    trim: true //remove both-side with space
  },
  description:{
    type: String,
  },
  imgUrl:{
    type: String,
  },
  main_cat:{
    type: String,
    required: true,
    trim: true
  },
  sub_cat:{
    type: String,
    required: true,
    trim: true
  },
  book_author:{
    type: String,
    required: true,
    trim: true
  },
  pub_date:{
    type: Date,
    required: true,
  },
  book_range:{
    type: Number,
    required: true,
    trim: true
  },
  barcode:{
    type: Number,
    required: true,
    trim: true
  },
  status:{
    type: String,// 00 is avaliable, 01 is borrow, 10 lose
    required: true,
  },
  updated:{
    type: Date,
    default:Date.now
  },
  instered:{
    type: Date,
    default:Date.now
  },
  updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admins',
  },
  insertedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admins',
  },
});

BookSchema.virtual('updated_date').get(function () {
  return dateformat(this.updated, 'dd/mm/yyyy HH:MM');
});

BookSchema.virtual('inserted_date').get(function () {
  return dateformat(this.inserted, 'dd/mm/yyyy HH:MM');
});
BookSchema.virtual('published_date').get(function () {
  return dateformat(this.pub_date, 'dd/mm/yyyy HH:MM');
});

BookSchema.virtual('update_main').get(function () {
  return str(this.main_cat);
});

function str(data) {
  switch (data) {
    case "A&M":
        return "Art & Music";
      break;
    case "Bio":
        return "Biographies";
      break;
    case "Bus":
        return "Business";
      break;
    case "Kid":
        return "Kids";
      break;
    case "Com":
        return "Comics";
      break;
    case "C&T":
        return "Computer & Tech";
      break;
    case "Cook":
        return "Cooking";
      break;
    case "H&C":
        return "Hobbies & Crafts";
      break;
    case "E&R":
        return "Edu & Reference";
      break;
    case "G&L":
        return "Gay & Lesbian";
      break;
    case "H&F":
        return "Health & Fitness";
      break;
    case "Hist":
        return "History";
      break;
    case "H&G":
        return "Home & Garden";
      break;
    case "Hor":
        return "Horror";
      break;
    case "Ent":
        return "Entertainment";
      break;
    case "L&F":
        return "Literature & Fiction";
      break;
    case "Med":
        return "Medical";
      break;
    case "Myst":
        return "Mysteries";
      break;
    case "Par":
        return "Parenting";
      break;
    case "Sos":
        return "Social Scienes";
      break;
    case "Reg":
        return "Regligion";
      break;
    case "Rom":
        return "Romance";
      break;
    case "S&M":
        return "Science & Math";
      break;
    case "S&F":
        return "Sci-fi & Fantasy";
      break;
    case "SelH":
        return "Self-Help";
      break;
    case "Spor":
        return "Sports";
      break;
    case "Teen":
        return "Teen";
      break;
    case "Tra":
        return "Travel";
      break;
    case "TruC":
        return "True Crime";
      break;
    case "West":
        return "Westerns";
      break;
    default:
       return "";
  }
}

module.exports =mongoose.model('Books',BookSchema);
