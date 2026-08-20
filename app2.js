const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`)
);

// --------------------
// ROUTE HANDLERS
// --------------------

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tour
    }
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign(
    { id: newId },
    req.body
  );

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated data here...'
    }
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(204).send();
};


// --------------------
// ROUTES
// --------------------

const tourRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);


// --------------------
// MIDDLEWARE
// --------------------

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// --------------------
// MOUNT ROUTER
// --------------------

app.use('/api/v1/tours', tourRouter);


// --------------------
// START SERVER
// --------------------

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});