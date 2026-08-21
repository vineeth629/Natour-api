const express = require('express');
const router = express.Router();//creates an express router object and store it in variable 

const userHandler = require('./../controllers/userController.js');

router
  .route('/')
  .get(userHandler.getAllUsers)
  .post(userHandler.createUser);

router
  .route('/:id')
  .get(userHandler.getUser)
  .patch(userHandler.updateUser)
  .delete(userHandler.deleteUser);

  module.exports = router;