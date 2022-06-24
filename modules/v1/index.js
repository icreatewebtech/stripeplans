const express = require('express');
const v1Route = express.Router();

v1Route.use('/',require('./web/webRoutes'));
v1Route.use('/user',require('./user/userRoutes'));
v1Route.use('/stripe',require('./stripe/stripeRoutes'));

module.exports = v1Route;