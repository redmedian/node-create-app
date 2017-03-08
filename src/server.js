import express from 'express';
import bodyparser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import basicAuth from 'basic-auth-connect';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';

import config from './config';
import pageRoute from './routes/page';

mongoose.Promise = bluebird;

mongoose.connect(config.db);

const app = express();

app.use(cors({ origin: '*' }));

// Запись лога в /logs/access.log
const logDirectory = path.join(__dirname, '../logs');

// Проверяем на наличие директории logDirectory
// eslint-disable-next-line no-unused-expressions
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Создаём ротацию лога
const accessLogStream = rfs('access.log', {
  interval: '1d', // ротировать ежедневно
  path: logDirectory,
});

// Настройки логгера Morgan
app.use(morgan('combined', { stream: accessLogStream }));

// Вывод лога в консоль (tiny, dev, combined)
app.use(morgan('dev'));

app.use(bodyparser.json());

app.use('/api/*', basicAuth('admin', '12345'));
app.use('/api', pageRoute);
app.get('/api', (req, res) => res.json({ message: 'Welcome to API' }));

app.listen(process.env.PORT || 3000, () => {
  global.console.log('Example app listening on port 3000');
});
