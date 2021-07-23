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

// this page comes when you get req on /showFinal/
// show the final page with particular hero id
router.get('/:Hero_id',authController.isLoggedIn,(req,res)=>{
    fetch('https://www.superheroapi.com/api.php/2540844492728712/' + req.params.Hero_id)
        .then(response => response.json())
        .then(data => {
            db.query("select *,TIMESTAMPDIFF(MINUTE,CURRENT_TIMESTAMP,Entry_date) as minutes_ago from Comment INNER JOIN users ON Comment.id = users.id where Comment.Hero_id="+req.params.Hero_id,(err,results,fields)=>{
                if(err)
                    console.log(err);
                else
                res.render("showFinal", { data: data, Qvalue: results, user : req.user,id : req.params.Hero_id });
            })
            
        }
    );        
})

// going to comments routes
router.use('/:Hero_id/comments' ,require('../routes/comments'));

module.exports = router;