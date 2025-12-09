// creating new rouer and importing express to use
const express = require("express")
const router = express.Router()

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
});

router.get('/login', function(req, res, next) {
    res.render("login.ejs");
});




// export router so index.js can accsess it
module.exports = router