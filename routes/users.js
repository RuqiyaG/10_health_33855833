// creating new rouer and importing express to use
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const saltRounds = 10
const {check, validationResult} = require('express-validator');

// redirects to log in page
const redirectLogin = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect('../users/login') 
    } else {
        next ();
    }
}

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
});

router.post('/registered', 
    [check('email').isEmail(), 
    check('username').isLength({min: 1, max: 20})], 
    function (req, res, next) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register.ejs')
    }
    else {
        const plainPassword = req.body.password;
        const username = req.sanitize(req.body.username);
        const first = req.sanitize(req.body.first);
        const last = req.sanitize(req.body.last);
        const email = req.sanitize(req.body.email);

        // stores hashed password in database
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword){
           // query to insert user info into database
           let sqlquery = "INSERT INTO users (username, first, last, email, hashedPassword) VALUES (?, ?, ?, ?, ?)";
           let usrInfo = [username, first, last, email, hashedPassword];

           // inserts the query into the database
           db.query(sqlquery, usrInfo, (err, result) => {
            if(err) {
               return next(err)
            }
            // message that will show up in browser to show successful.
            let response = ' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email
            response += 'Your password is:'+ " " + req.body.password +  'and your hashed password is:'+ " " + hashedPassword

            res.send(response) 
        });
     })
    }
});    

router.get('/login', function(req, res, next) {
    res.render("login.ejs");
});

router.post('/loggedin', function(req, res, next) {
    const plainPassword = req.body.password;
    const username = req.body.username;

    let sqlquery = "SELECT hashedPassword FROM users where username = ?";
    db.query(sqlquery, [username], (err, result) => {
        if(err) {
            next(err)
        }
        if (!result[0]) {
            return res.send("LOgin unsuccessful: User not found");
        }
        let hashedPassword = result[0].hashedPassword
        bcrypt.compare(req.body.password, hashedPassword, function(err, isMatch) {
            if (err) {
              return next(err)
            }
            else if (isMatch) {              //result == true
              req.session.userId = username 
              res.send("LOg in successful!!!!")
            }
            else {
              res.send("LOg in unsuccessful: Incorrect Password")
            }
          });

    });

});

router.get('/listmembers', redirectLogin, function (req, res, next) {
    // left out hashed password so it is not retrievd
    let sqlquery = "SELECT id, username, first, last, email FROM users";

    // inserts query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("listmembers.ejs",{users:result});
    });
});

// need to add forgotten password
//need to add search for leg,arms,back excersing
// add some api with dynamics and reccomend excercise to do if it warm or cold
// imrove on sanitisation
//improve search

// export router so index.js can accsess it
module.exports = router