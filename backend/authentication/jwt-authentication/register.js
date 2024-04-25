const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {registerUser} = require('../../models/usersModel.js');
const jsonValidator = require('jsonschema');
const userSchema = require('../../json-schema/userSchema.json');
const {ExpressError} = require('../../error-handling/ExpressError.js');

router.post('/', async (req, res, next) => {
    try {
        console.log('register', req.body)
        const isValid = jsonValidator.validate(req.body, userSchema);
        console.log('register', isValid)

        if (!isValid.valid) {
            const errs = isValid.errors.map(e => e.stack); //Used for dev and stage should not be on production.
            throw new ExpressError("Internal Server Error", 500);
        }

        const {username, password, email, firstName, lastName, battleTag} = req.body;
        console.log('register', req.body)
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await registerUser(username, hashedPassword, email, firstName, lastName, battleTag);

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
