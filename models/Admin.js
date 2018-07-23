var mongoose = require('mongoose'); //mongodb module
var dateformat = require('dateformat');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var AdminSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  imgUrl:{
    type: String,
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
});

AdminSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8),null);
  next();
});

AdminSchema.virtual('updated_date').get(function () {
  return dateformat(this.updated, 'dd/mm/yyyy HH:MM');
});

AdminSchema.virtual('inserted_date').get(function () {
  return dateformat(this.Inserted, 'dd/mm/yyyy HH:MM');
});

AdminSchema.statics.compare = function (cleartext,encrypted) {
  return bcrypt.compareSync(cleartext,encrypted);
};

module.exports =mongoose.model('Admins',AdminSchema);
