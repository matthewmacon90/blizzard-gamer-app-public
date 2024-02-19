const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => res.redirect('/'));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;