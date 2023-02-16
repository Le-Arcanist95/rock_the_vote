const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Signup
exports.register = (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        const {username, password, email} = req.body;
        if(err){
            res.status(500);
            return next(err);
        }
        if(user){
            res.status(403);
            return next(new Error('Username already exists'));
        }
        if(!username || !password){
            res.status(403);
            return next(new Error('Username and password are required'));
        }

        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = new User({username: username, password: hash, email: email});
            newUser.save();
            return res.status(201).send({user: newUser.withoutPassword()});
        }
        catch(err){
            res.status(500);
            return next(err);
        }
    });
};

// Login
exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500);
            return next(err);
        }
        if(!user){
            res.status(403);
            return next(new Error('Username or password are incorrect'));
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            res.status(403);
            return next(new Error('Username or password are incorrect'));
        }
         
        const accessToken = jwt.sign(user.withoutPassword(), process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});            
        return res.status(200).send({ accessToken, user: user.withoutPassword() });
    });
};