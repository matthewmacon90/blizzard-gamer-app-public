require('dotenv').config();
const passport = require('passport');
const BnetStrategy = require('passport-bnet').Strategy;

passport.use(new BnetStrategy({
    clientID: process.env.BLIZZARD_CLIENT_ID,
    clientSecret: process.env.BLIZZARD_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/battlenet/callback",
    region: "us",
    state: true
}, 
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

