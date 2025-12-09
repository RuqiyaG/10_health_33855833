// creating new rouer and importing express to use
const express = require("express")
const router = express.Router()

router.get('/bookapp',function(req, res, next){
    res.render('appointment.ejs')
});




// export router so index.js can accsess it
module.exports = router