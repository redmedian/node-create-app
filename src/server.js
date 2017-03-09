import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from 'config';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import basicAuth from 'basic-auth-connect';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';

// Регистрация роутов
import bookRoute from './routes/book';

// Настройка БД
mongoose.Promise = bluebird;
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', global.console.error.bind(console, 'connection error:'));

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));

// Запись лога в директорию /logs/
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

// Не показывать логи в тестовом окружении
if (config.util.getEnv('NODE_ENV') !== 'test') {
  // Вывод лога в консоль (tiny, dev, combined)
  app.use(morgan('dev'));
}

// парсинг application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => res.send('Welcome'));
app.use('/api/*', basicAuth('admin', '12345'));
app.use('/api', bookRoute);
app.get('/api', (req, res) => res.json({ message: 'Welcome to API' }));

app.listen(port, () => {
  global.console.log('Example app listening on port 3000');
});

// Для тестирования
module.exports = app;
