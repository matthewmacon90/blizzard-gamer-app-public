const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const {SESSION_SECRET} = require('./db/config.js');
const helmet = require('helmet');
require('./authentication/oauth2-blizzard/blizzardPassport.js');

//Routes
const registerRoutes = require('./authentication/jwt-authentication/register.js');
const loginRoutes = require('./authentication/jwt-authentication/login.js');
const homeRoutes = require('./routes/home.js');
const userRouter = require('./routes/users.js');
const blizzardRoutes = require('./authentication/oauth2-blizzard/blizzardRoutes.js');
const wowProfileRoutes = require('./routes/wowProfileRoutes.js');
const guildRoutes = require('./routes/guildRoutes.js');
const mountsRoutes = require('./routes/mountsRoutes.js');
const dungeonRoutes = require('./routes/dungeonRoutes.js');
const realmRoutes = require('./routes/realmRoutes.js');


const app = express();

app.use(helmet());
app.use(cors({}));
app.use(express.json());
app.use(morgan('tiny'));

app.use(session({ 
    secret: SESSION_SECRET, 
    name:'connect.sons', 
    resave: false, 
    saveUninitialized: false, 
    cookie: { 
        httpOnly: false, 
        secure: false, 
        maxAge:3600000 
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/battlenet', blizzardRoutes);
app.use('/users', userRouter);
app.use('/my-wow', wowProfileRoutes);
app.use('/guilds', guildRoutes);
app.use('/mounts', mountsRoutes);
app.use('/dungeons', dungeonRoutes);
app.use('/realms', realmRoutes);

app.use((err, req, res, next) => {
    const message = err.message || 'Something went wrong';
    const status = err.status || 500;
    return res.status(status).json({error: message, status: status});
});

module.exports = app;
