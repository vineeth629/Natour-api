const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({

  name: {

    // Defines the data type of name
    type: String,

    // Field must be provided; message shown if missing
    required: [true, "A tour must have a name"],

    // Prevents duplicate names using a unique index
    unique: true
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
  }
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;