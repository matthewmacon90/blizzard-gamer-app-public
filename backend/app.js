const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');

//Routes
const registerRoutes = require('./authentication/jwt-authentication/register.js');
const homeRoutes = require('./routes/home.js');
const userRouter = require('./routes/users.js');
const authenticateGoogleRoutes = require('./authentication/oauth2-google/authenticateGoogleRoutes.js');


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(session({ secret: 'YOUR_SESSION_SECRET', resave: false, saveUninitialized: false, cookie: { secure: true}}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRoutes);
app.use('/register', registerRoutes);
app.use('/google', authenticateGoogleRoutes);
app.use('/users', userRouter);

app.use((err, req, res, next) => {

});

module.exports = app;
