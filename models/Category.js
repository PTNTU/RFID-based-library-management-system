var mongoose = require('mongoose'); //mongodb module
var dateformat = require('dateformat');
var timeAgo = require('node-time-ago');
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
  return timeAgo(this.updated);
});

CategorySchema.virtual('instered_date').get(function () {
  return timeAgo(this.instered);
});


module.exports =mongoose.model('Categories',CategorySchema);
