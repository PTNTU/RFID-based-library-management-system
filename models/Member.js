var mongoose = require('mongoose'); //mongodb module
var bcrypt = require('bcrypt-nodejs');
var dateformat = require('dateformat');
//Define a schama
var Schema = mongoose.Schema;
var MemberSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true //remove both-side with space
  },
  phone: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  imgUrl:{
    type: String
  },
  major:{
    type: String,
    required:true,
  },
  status:{
    type: String, // 00 is normal,01 is warning,10 is Inactive,11 is block
    required:true,
  },
  year:{
    type: String,
    required:true,
  },
  last_borrow:{
    type: Date,
  },
  roleNo:{
    type:Number,
    required:true,
  },
  last_act:{
    type: String,
    default: "01" // 01 complete, 00 is borrow
  },
  rfid:{
    type:String,
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
MemberSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8),null);
  next();
});

MemberSchema.virtual('updated_date').get(function () {
  return dateformat(this.updated, 'dd/mm/yyyy HH:MM');
});

MemberSchema.virtual('inserted_date').get(function () {
  return dateformat(this.Inserted, 'dd/mm/yyyy HH:MM');
});

MemberSchema.statics.compare = function (cleartext,encrypted) {
  return bcrypt.compareSync(cleartext,encrypted);
};
module.exports =mongoose.model('Members',MemberSchema);
