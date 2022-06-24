const express = require('express');
const modulesRoute = express.Router();

modulesRoute.use('/',require('./v1'));

module.exports = modulesRoute;