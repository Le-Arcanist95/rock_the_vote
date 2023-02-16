const User = require('../models/User');

// Get All Users
exports.getAllUsers = (req, res, next) => {
    User.find((err, users) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users)
    })
}

// Add new User
exports.addUser = (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    })
}

// Delete User
exports.deleteUser = (req, res, next) => {
    User.findOneAndDelete(
        { _id: req.params.userId },
        (err, deletedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted user ${deletedUser.username}`)
        }
    )
}

// Update User
exports.updateUser = (req, res, next) => {
    User.findByIdAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true },
        (err, updatedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedUser)
        }
    )
}

// Get User by ID
exports.getUser = (req, res, next) => {
    User.findOne(
        { _id: req.params.userId },
        (err, foundUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(foundUser)
        }
    )
}