import 'dotenv/config'; 
import express from 'express';
import bootstrapApp from './src/app.controller.js';

const app = express();

bootstrapApp(app, express);