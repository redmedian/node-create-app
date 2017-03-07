import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import basicAuth from 'basic-auth-connect';
import cors from 'cors';

import config from './config';
import pageRoute from './routes/page';

mongoose.Promise = bluebird;

mongoose.connect(config.db);

const app = express();

app.use(cors({ origin: '*' }));

app.use(bodyparser.json());

app.use('/api/*', basicAuth('admin', '12345'));
app.use('/api', pageRoute);
app.get('/api', (req, res) => res.json({ message: 'Welcome to API' }));

app.listen(process.env.PORT || 3000, () => {
  global.console.log('Example app listening on port 3000');
});
