const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');

// --------------------
// MIDDLEWARE
// --------------------

app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// --------------------
// DATA
// --------------------






// ==================================================
// TOUR ROUTE HANDLERS
// ==================================================




// ==================================================
// USER ROUTE HANDLERS
// ==================================================


// ==================================================
// TOUR ROUTES
// ==================================================




// ==================================================
// USER ROUTES
// ==================================================




// ==================================================
// MOUNT ROUTERS
// ==================================================

app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);


// ==================================================
// START SERVER
// ==================================================

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});