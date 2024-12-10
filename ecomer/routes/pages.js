const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get("/login", (req, res)  => {
    res.render("login");
    });

router.get("/registration", (req, res)  => {
    res.render("registration");
    });

router.get("/products", (req, res) => {
     res.render("products");
    });

router.get("/about", (req, res)  => {
    res.render("about");
    });
    
router.get("/contacts", (req, res)  => {
    res.render("contacts");
    });

router.get("/cart", (req, res)  => {
    res.render("cart");
    });
    
       


    module.exports = router;