import dotenv from 'dotenv';
dotenv.config({ path: './.config.env' });

import configDb from './config/configdb';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import edgeRouter from './routes/edge';
import investigationRouter from './routes/investigation';

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
