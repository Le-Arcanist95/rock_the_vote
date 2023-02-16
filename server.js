require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');
const cors = require('cors');
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Connect to DB
mongoose.connect(MONGO_URI, () => console.log('Connected to the DB'));

// Routes
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', expressjwt({secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256']}));
app.use('/api/issues', require('./routes/issueRouter.js'));
app.use('/api/user', require('./routes/userRouter.js'));

// Error handler
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
    res.status(err.status);
  }
  console.log(err);
  return res.send({errMsg: err.message});
});

// Listen
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});