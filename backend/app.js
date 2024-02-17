const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routes/users.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/users', userRouter);

app.use((err, req, res, next) => {

});

module.exports = app;
