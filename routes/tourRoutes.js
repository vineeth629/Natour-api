const express = require('express');
const router = express.Router();
const tourHandler = require('./../controllers/tourController.js');
router.param('id',tourHandler.checkID);//example of param middleware
router
  .route('/')
  .get(tourHandler.getAllTours)
  .post(tourHandler.createTour);

router
  .route('/:id')
  .get(tourHandler.getTour)
  .patch(tourHandler.updateTour)
  .delete(tourHandler.deleteTour);

  module.exports = router;