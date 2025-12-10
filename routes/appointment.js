// creating new rouer and importing express to use
const express = require("express")
const router = express.Router()

// redirects to log in page
const redirectLogin = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect('../users/login') 
    } else {
        next ();
    }
}

router.get('/bookapp', redirectLogin, function(req, res, next){
    res.render('appointment.ejs')
});




// export router so index.js can accsess it
module.exports = router