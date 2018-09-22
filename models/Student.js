var mongoose = require('mongoose'); //mongodb module
var dateformat = require('dateformat');
//Define a schama
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
  ent_no:{
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true //remove both-side with space
  },
  phone: {
    type: String,
    trim: true
  },
  imgUrl:{
    type: String
  },
  major:{
    type: String,
    required:true,
  },
  ac_year:{
    type: String,
  },
  year:{
    type: String,
    required:true,
  },
  roleNo:{
    type:Number,
    required:true,
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

//hashing a password before saving it to the database
StudentSchema.virtual('updated_date').get(function () {
  return dateformat(this.updated, 'dd/mm/yyyy HH:MM');
});

StudentSchema.virtual('inserted_date').get(function () {
  return dateformat(this.inserted, 'dd/mm/yyyy HH:MM');
});

module.exports =mongoose.model('Students',StudentSchema);
