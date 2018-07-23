var mongoose = require('mongoose'); //mongodb module
var dateformat = require('dateformat');

var Schema = mongoose.Schema;
var BookSchema = new Schema({
  book_name: {
    type: String,
    required: true,
    trim: true //remove both-side with space
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

module.exports =mongoose.model('Books',BookSchema);
