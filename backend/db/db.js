const {Client}= require('pg');
const {SECRECT, processEnv, PORT, DB_NAME, DB_NAME_TEST, DB_USER, DB_PASSWORD, PATH} = require('./config');


const db = new Client({
    host: 'localhost',
    secret: SECRECT,
    port: PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
});

try {
    db.connect();
    console.log('connected to db');
} catch (err) {
    console.error('ERROR: ', err);
    db.end();

}


console.log('db', db, 'client', Client); 