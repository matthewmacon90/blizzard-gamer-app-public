const express = require('express');
const router = express.Router();
// const db = require('../db/db.js');
// console.log('db:', db);

router.get('/', async (req, res, next) => { 
    try {
        console.log('ON users route');
    } catch (err) {
        console.error(err);
        // next(err);
    }
});

module.exports = router;
