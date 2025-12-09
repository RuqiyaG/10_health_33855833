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

// setting up database and making it global so it can be accessed
const db = mysql.createPool({
    host: process.env.HEALTH_HOST,
    user: process.env.HEALTH_USER,
    password: process.env.HEALTH_PASSWORD,
    database: process.env.HEALTH_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
global.db = db

//creating session and it has to go in front of routes
app.use(session({
    secret: 'ramdomfitness',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 300000   // will log you out after 5 min of inactivity
    }
}));

// making sanitizer available to use and it has to be before the routes
app.use(expressSanitizer());

// loading the route handlers so that it can be accessdd.
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

const appointRoutes = require('./routes/appointment')
app.use('/appointment', appointRoutes)

const searchRoutes = require('./routes/search')
app.use('/search', searchRoutes)

//start the app listening
app.listen(port, () => console.log(`Fitness Galore listening on port ${port}!!!`));

