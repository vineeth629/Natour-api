// Express application
const app = require('./app');

// Mongoose: ODM used to interact with MongoDB
const mongoose = require('mongoose');

// Node's DNS module — used to fix MongoDB Atlas DNS issue
const dns = require('dns');
dns.setServers(['1.1.1.1']);

// dotenv loads variables from config.env into process.env
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Replace <PASSWORD> in the connection string with actual password
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connect Mongoose to MongoDB
mongoose.connect(db, {

  // Uses modern MongoDB connection-string parser
  useNewUrlParser: true,

  // Uses createIndex() instead of deprecated ensureIndex()
  useCreateIndex: true,

  // Uses native findOneAndUpdate() instead of deprecated findAndModify()
  useFindAndModify: false

}).then(con => {

  // con contains information about the MongoDB connection
  console.log(con.connections);

  console.log("DB connection successful");
});


// Schema = blueprint defining the structure of a Tour document
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

  princ_inr: {

    // Price must be a number
    type: Number,

    // Price must be provided
    required: [true, 'A tour must have a price']
  }
});


// Model = interface used to perform operations on Tour documents
const Tour = mongoose.model('Tour', tourSchema);


// Port on which Express server will run
const port = process.env.PORT || 3000;


// Start the Express server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});