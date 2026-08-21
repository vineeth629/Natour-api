const express = require('express');
const router = express.Router();
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/tours-simple.json`)
);

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
router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

  module.exports = router;