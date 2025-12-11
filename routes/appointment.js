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

// will redirect you another page to confirm you have an appointment
router.post('/confirmapp', function(req, res, next) {
    // query to insert all appointment infor into database
    let sqlquery = "INSERT INTO appointments (name, appDate, appTime, appInfo) VALUES(?, ?, ?, ?)";
    let {name, date, time, reason} = req.body
    let newrecord = [name, date, time, reason];

    db.query(sqlquery, newrecord, (err, result) => {
        if(err) {
            next(err)
        }
        res.send('Your appointment has been booked,see you soon!');
      });

});

// export router so index.js can accsess it
module.exports = router