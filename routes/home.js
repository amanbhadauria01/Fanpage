const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');
const fetch = require("node-fetch");
const mysql = require('mysql');

const db = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

// this page comes when you get req on /
router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.user
    });
})

// register
router.get('/register',(req, res) => {
    res.render('register');
})

// login
router.get('/login',(req, res) => {
    res.render('login');
})

// profile
router.get('/profile', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('profile', {
            user: req.user
        });
    }else{
        res.redirect('/login');
    }
})

// contact
router.get('/contact',authController.isLoggedIn,  (req, res) => {
    if(req.user)res.render('contact', {
        user: req.user
    });
    else  res.render('contact');
})

// about
router.get('/about',authController.isLoggedIn,  (req, res) => {
    if(req.user)res.render('about', {
        user: req.user
    });
    else  res.render('about');
})


module.exports = router;