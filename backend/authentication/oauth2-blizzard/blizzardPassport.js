require('dotenv').config();
const passport = require('passport');
const BnetStrategy = require('passport-bnet').Strategy;
console.log(BnetStrategy)

passport.use(new BnetStrategy({
    clientID: process.env.BLIZZARD_CLIENT_ID,
    clientSecret: process.env.BLIZZARD_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/battlenet/callback",
    region: "us",
    state: true,
    scope: ['wow.profile', 'openid', 'email']
}, 
    function(accessToken, refreshToken, profile, done) {
        console.log('profile: ', profile);
        //In need to grab data from the profile object. 
        //In process of checking for user in db and creating user if not found or updating if a user exists.
        // console.log('PROFILE: ', profile);
        profile.refreshToken = refreshToken;
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