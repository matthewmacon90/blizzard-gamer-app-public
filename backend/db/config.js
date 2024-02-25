require('dotenv').config();

const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;


const getEnvironmentInformation = () => {
    const environment = {
        HOST: process.env.HOST,
        NODE_ENV: process.env.NODE_ENV,
        DB_NAME: process.env.DB_NAME,
        DB_NAME_TEST: process.env.DB_NAME_TEST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_PORT: process.env.DB_PORT,
        DB_URI: null
    }

    if (process.NODE_ENV === 'test') {
        environment.DB_URI = `postgresql://${environment.DB_USER}:${environment.DB_PASSWORD}@${environment.HOST}:${environment.DB_PORT}/${environment.DB_NAME_TEST}`;
    } else {
        environment.DB_URI = `postgresql://${environment.DB_USER}:${environment.DB_PASSWORD}@${environment.HOST}:${environment.DB_PORT}/${environment.DB_NAME}`;
    }
    return environment.DB_URI;
}

module.exports = {
    getEnvironmentInformation, 
    PORT,
    SECRET_KEY
};