require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const processEnv = process.env;
const PORT = +process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const DB_NAME_TEST = process.env.DB_NAME_TEST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
    SECRET_KEY,
    processEnv,
    PORT,
    DB_NAME,
    DB_NAME_TEST,
    DB_USER,
    DB_PASSWORD
}