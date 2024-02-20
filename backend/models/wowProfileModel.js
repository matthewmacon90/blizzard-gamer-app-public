const db = require('../db/db.js');

// This is a model for the WoWProfileData. It will be used to create a new user profile in the database or connect to an existing one.

class WoWProfileData {
    static createWoWProfileData(data) {
        try {
            console.log('INSIDE CREATE WOW DATA: ', data);
            const result = db.query(`
                INSERT INTO users (id, battletag, wow_profile)
                VALUES (?, ?, ?)
                INSERT INTO characters ()
                VALUES ()
            `);
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = WoWProfileData;