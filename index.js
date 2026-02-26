require('dotenv').config({ path: './src/config/.env' });
const express = require('express');
const bootstrapApp = require('./src/app.controller');

const app = express();

bootstrapApp(app, express);