// importing all neccessary components e.g sql.express,express session and sanitizer
var express = require('express');
var ejs = require('ejs');
var mysql = require('mysql2');
var session = require('express-session');
const path = require('path');
const expressSanitizer = require('express-sanitizer');
require('dotenv').config();

// creating the express app
const app = express();
const port = 8000;

// using ejs as a template
app.set('view engine', 'ejs');
// body parser set up
app.use(express.urlencoded({extended: true}));
// connecting css file so that it can be used
app.use(express.static(path.join(__dirname, 'style')));
// setting up data to use for my fitness app
app.locals.healthData = {healthName: "Fitness Galore"}

