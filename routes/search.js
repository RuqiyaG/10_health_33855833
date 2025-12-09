const express = require("express");
const router = express.Router();

router.get('/search', function(req, res, next) {
    res.render('search.ejs')
});

module.exports = router
