require('dotenv').config();
const passport = require('passport');
const BnetStrategy = require('passport-bnet').Strategy;

passport.use(new BnetStrategy({
    clientID: process.env.BLIZZARD_CLIENT_ID,
    clientSecret: process.env.BLIZZARD_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/battlenet/callback",
    region: "us",
    state: true,
    scope: ['wow.profile']
}, 
    function(accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        return done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});