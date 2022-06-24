const express = require('express');
// const bodyParser = require('body-parser')
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

// set engine ejs
app.set("view engine","ejs");

// parse application/json
app.use(bodyParser.raw({type:  "application/json"}));

// use cookies
app.use(cookieParser()); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))

//public folder  
app.use(express.static('public'));
// routes
app.use(require('../routes'));

app.all('/*',(req,res) => {
    res.status(404).json({error: "Page not found"});
});

module.exports = app;