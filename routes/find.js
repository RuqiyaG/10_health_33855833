const express = require("express");
const { search } = require("./main");
const router = express.Router();

router.get('/search', function(req, res, next) {
    res.render('search.ejs')
});

router.get('/search-results', function (req, res, next) {
    let sqlquery = "SELECT title, description FROM exercises WHERE LOWER(title) LIKE ? OR LOWER(description) LIKE ?;"
    let key = req.query.keyword
    let search = `%${key}%`;
    db.query(sqlquery, [search,search], (err, result) => {
        if(err) {
            next(err)
        }
        // if (result.length === 0) {
        //     return res.send("No exercises found matching your search.");
        // }
        res.render('search-results.ejs', {
            keyword: key,  
            results: result 
        });
    });
});

module.exports = router
