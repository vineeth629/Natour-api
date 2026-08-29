const Tour = require('./../models/tourModel.js');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success'
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success'
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success'
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success'
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).send();
};