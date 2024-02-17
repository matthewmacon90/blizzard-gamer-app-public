const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        return res.status(200).send('Welcome to the home page!');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
    
});

module.exports = router;