const {Client}= require('pg');
const {getEnvironmentInformation} = require('./config');


const db = new Client({
    connectionString: getEnvironmentInformation()
});

db.connect();

module.exports = db;