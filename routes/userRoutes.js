const express = require('express');
const router = express.Router();//creates an express router object and store it in variable 

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
};


const getUser = (req, res) => {
  const id = req.params.id * 1;

  const user = users.find(el => el.id === id);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
};


const createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;

  const newUser = Object.assign(
    { id: newId },
    req.body
  );

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/users.json`,
    JSON.stringify(users, null, 2),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser
        }
      });
    }
  );
};


const updateUser = (req, res) => {
  const id = req.params.id * 1;

  const user = users.find(el => el.id === id);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: 'Updated data here...'
    }
  });
};


const deleteUser = (req, res) => {
  const id = req.params.id * 1;

  const user = users.find(el => el.id === id);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(204).send();
};

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

  module.exports = router;