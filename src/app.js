
const express = require('express');
const shortenRoutes = require('./routes/shorten');
const redirectRoutes = require('./routes/redirect');

const app = express();
app.use(express.json());

app.use('/api/v1', shortenRoutes);
app.use('/', redirectRoutes);

module.exports = app;
