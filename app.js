const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');

// --------------------
// MIDDLEWARE
// --------------------

if(process.env.NODE_ENV==='development'){
     app.use(morgan('dev'));

}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// ==================================================
// MOUNT ROUTERS
// ==================================================

app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);


// ==================================================
// START SERVER
// ==================================================
module.exports = app;