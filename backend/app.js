const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const {SECRET_KEY} = require('./db/config.js');
require('./authentication/oauth2-google/googlePassport.js');
require('./authentication/oauth2-blizzard/blizzardPassport.js');

//Routes
const registerRoutes = require('./authentication/jwt-authentication/register.js');
const loginRoutes = require('./authentication/jwt-authentication/login.js');
const homeRoutes = require('./routes/home.js');
const userRouter = require('./routes/users.js');
const googleRoutes = require('./authentication/oauth2-google/googleRoutes.js');
const blizzardRoutes = require('./authentication/oauth2-blizzard/blizzardRoutes.js');
const wowProfileRoutes = require('./routes/wowProfileRoutes.js');


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(session({ secret: SECRET_KEY, resave: false, saveUninitialized: false, cookie: { secure: false}}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/google', googleRoutes);
app.use('/battlenet', blizzardRoutes);
app.use('/users', userRouter);
app.use('/my-wow', wowProfileRoutes);

app.use((err, req, res, next) => {
    const message = err.message || 'Something went wrong';
    const status = err.status || 500;
    return res.status(status).json({error: message, status: status});
});

module.exports = app;
