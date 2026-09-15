const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({

  name: {

    // Defines the data type of name
    type: String,

    // Field must be provided; message shown if missing
    required: [true, "A tour must have a name"],

    // Prevents duplicate names using a unique index
    unique: true,
    trim : true
  },
  difficult:{
    type:String,
    required: [true,"A tour must have a difficulty"]
  },
   durations:{
    type:Number,
    required: [true,"A tour must have a duration"]
   },
  rating: {

    // Rating must be a number
    type: Number,

    // Value used when rating is not provided
    default: 4.5
  },

  price_inr: {

    // Price must be a number
    type: Number,

    // Price must be provided
    required: [true, 'A tour must have a price']
  },
  priceDiscount : Number,
  description:{
    type:String,
    trime:true
  },
  imageCover:{
    type:String,
    required: [true,"A tour must have a cover image"]
  },
  images:[String],
  createdAt:{
    type: Date,
    default:Date.now()//timestamp in milli seconds and mongoose will convert it to todays date
  },
  startdate: [Date]
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;