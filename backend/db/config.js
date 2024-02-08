"use strict";

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';
const processEnv = process.env;
const PORT = +process.env.PORT || 3001;
console.log('SECRET_KEY:', SECRET_KEY, processEnv);