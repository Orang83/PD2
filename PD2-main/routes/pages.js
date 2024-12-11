const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
app.get("/login", (req,res)  => {
    res.render("login");
    });


app.get("/registration", (req,res)  => {
    res.render("registration");
    });


    module.exports = router;