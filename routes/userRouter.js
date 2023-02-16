const express = require('express');
const userRouter = express.Router();
const { getAllUsers, addUser, getUser, updateUser, deleteUser } = require('../controllers/UserController.js');

userRouter.route('/')
    .get(getAllUsers)
    .post(addUser);

userRouter.route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = userRouter;