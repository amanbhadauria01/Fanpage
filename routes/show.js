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

// this page comes when you get req on /show/

router.get('/:search',authController.isLoggedIn,(req,res)=>{
    fetch('https://www.superheroapi.com/api.php/2540844492728712/search/' + req.params.search)
        .then(response => response.json())
        .then(data => {
            // console.log(data.results);
            res.render("show", { data: data.results , user : req.user});
        }
    );
})

router.post('/',authController.isLoggedIn,(req, res) => {
    let name = req.body.name;
    res.redirect('/show/'+name);
    
})

module.exports = router;