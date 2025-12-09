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

// handling routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

router.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.redirect('./')
        }
        res.send(`You are logged out. <a href='/'>Home</a>`)
    })
})




// export router so index.js can accsess it
module.exports = router