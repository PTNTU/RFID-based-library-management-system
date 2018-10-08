var mongoose = require('mongoose'); //mongodb module
var dateformat = require('dateformat');
var bcrypt = require('bcrypt-nodejs');
//Define a schama
var Schema = mongoose.Schema;
var StaffSchema = new Schema({
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
  dept:{
    type: String,
    required:true,
  },
  password:{
    type: String,
    required: true,
    trim: true
  },
  status:{
    type: String,
    default: '00', // 00 is normal,01 is warning,10 is Inactive,11 is block
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
  ocp:{
    type: String,
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

StaffSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8),null);
  next();
});
//hashing a password before saving it to the database
StaffSchema.virtual('updated_date').get(function () {
  return dateformat(this.updated, 'dd/mm/yyyy HH:MM');
});

StaffSchema.virtual('inserted_date').get(function () {
  return dateformat(this.inserted, 'dd/mm/yyyy HH:MM');
});

StaffSchema.statics.compare = function (cleartext,encrypted) {
  return bcrypt.compareSync(cleartext,encrypted);
};
module.exports =mongoose.model('Staffs',StaffSchema);
