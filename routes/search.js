// creating new rouer and importing express to use
const express = require("express")
const router = express.Router()

router.get('/searching',function(req, res, next){
    res.render('search.ejs')
});

// export router so index.js can accsess it
module.exports = router