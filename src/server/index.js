const express = require('express');

const config = require('../config/index');


const app = express();
app.set('config', config);

app.use(express.json());

const db = require('../models');
db.sequelize.sync({ force: config.db.resetDatabase })
  .then(() => console.log('Database is ready.'));

app.use(require('../router'));

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  res.status(err.status)
    .json({ type: 'error', message: 'you should not be here' });

  next(err);
});

module.exports = app;