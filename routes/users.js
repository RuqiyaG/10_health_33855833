// creating new rouer and importing express to use
const express = require("express")
const router = express.Router()

// redirects to log in page
const redirectLogin = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect('/users/login') 
    } else {
        next ();
    }
}

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
});

router.get('/login', function(req, res, next) {
    res.render("login.ejs");
});

// need to add forgotten password
//need to add search for leg,arms,back excersing
// search for healthy recipes
// add some api with dynamics and reccomend excercise to do if it warm or cold
// imrove on sanitisation
//improve search



// export router so index.js can accsess it
module.exports = router