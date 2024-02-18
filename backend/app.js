const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const {SECRET_KEY} = require('./db/config.js');
require('./authentication/oauth2-google/googlePassport.js');

//Routes
const registerRoutes = require('./authentication/jwt-authentication/register.js');
const loginRoutes = require('./authentication/jwt-authentication/login.js');
const homeRoutes = require('./routes/home.js');
const userRouter = require('./routes/users.js');
const authenticateGoogleRoutes = require('./authentication/oauth2-google/authenticateGoogleRoutes.js');
const ExpressError = require('./error-handling/ExpressError.js');


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(session({ secret: SECRET_KEY, resave: false, saveUninitialized: false, cookie: { secure: true}}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/google', authenticateGoogleRoutes);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
    const message = err.message || 'Something went wrong';
    const status = err.status || 500;
    return res.status(status).json({error: message, status: status});
});

module.exports = app;
