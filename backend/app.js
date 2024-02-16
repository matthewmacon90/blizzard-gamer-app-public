const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routes/users.js');
console.log('userRouter:', userRouter);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/users', userRouter);



module.exports = app;
