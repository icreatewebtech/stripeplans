const express = require('express');
const routes =  express.Router();

routes.use('/',require('./modules'));

module.exports = routes;