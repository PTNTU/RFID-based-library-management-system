var mongoose = require('mongoose'); //mongodb module
var dateformat = require('dateformat');
//Define a schama
var Schema = mongoose.Schema;
var CategorySchema = new Schema({
  main_cat: {
    type: String,
    required: true,
    trim: true //remove both-side with space
  },
  sub_cat: {
    type: String,
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

CategorySchema.virtual('updated_date').get(function () {
  return dateformat(this.updated, 'dd/mm/yyyy HH:MM');
});

CategorySchema.virtual('instered_date').get(function () {
  return dateformat(this.instered, 'dd/mm/yyyy HH:MM');
});

CategorySchema.virtual('update_main').get(function () {
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
module.exports =mongoose.model('Categories',CategorySchema);
