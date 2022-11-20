require('dotenv').config({ path: './.config.env' });
import configDb from './config/configdb';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const edgeRouter = require('./routes/edge');
const investigationRouter = require('./routes/investigation');

configDb();
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/investigation', investigationRouter);
app.use('/api/edge', edgeRouter);

export default app;
