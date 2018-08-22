var mongoose = require('mongoose'); //mongodb module
var dateformat = require('dateformat');
// var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var RecordSchema = new Schema({
  member_id:{
    type: Schema.Types.ObjectId,
    ref: 'Members',
  },
  books:[{
      book_id: {
          type: Schema.Types.ObjectId,
          ref: 'Books',
      },
      name:{
        type: String,
        required: true,
        trim: true
      },
      range:{
          type: Number,
          required: true,
      },
      author:{
        type: String,
        required: true,
        trim: true
      },
      barcode:{
        type: Number,
        required: true,
        trim: true
      },
  }],
  type:{
    type: String, // 00 is borrow, 01 is return
    required: true,
  },
  status:{
    type: String, // 00 is not finish, 01 complete
    required: true,
  },
  borrowed:{
    type: Date,
    default:null
  },
  received:{
    type: Date,
    default:null
  },

  borrowedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admins',
      default: null
  },
  receivedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admins',
      default: null
  },
  tol_range: {
    type: Number,
    required: true
  }
});

RecordSchema.virtual('borrowed_date').get(function () {
  return dateformat(this.borrowed, 'dd/mm/yyyy HH:MM');
});

RecordSchema.virtual('received_date').get(function () {
  return dateformat(this.received, 'dd/mm/yyyy HH:MM');
});



module.exports =mongoose.model('Records',RecordSchema);
