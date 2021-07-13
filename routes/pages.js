const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');
const fetch = require("node-fetch");
const mysql = require('mysql');
const methodOverride = require("method-override");
//const myScripts=require('../public/stylesheets/EventListeners.js');

const db = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});


router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.user
    });
})

router.get('/register',(req, res) => {
    res.render('register');
})

router.get('/login',(req, res) => {
    res.render('login');
})

router.get('/profile', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('profile', {
            user: req.user
        });
    }else{
        res.redirect('/login');
    }
})

router.get('/contact',authController.isLoggedIn,  (req, res) => {
    if(req.user)res.render('contact', {
        user: req.user
    });
    else  res.render('contact');
})

router.get('/about',authController.isLoggedIn,  (req, res) => {
    if(req.user)res.render('about', {
        user: req.user
    });
    else  res.render('about');
})


router.get('/show/:search',authController.isLoggedIn,(req,res)=>{
    fetch('https://www.superheroapi.com/api.php/2540844492728712/search/' + req.params.search)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
            res.render("show", { data: data.results , user : req.user});
        }
    );
})

router.post('/show',authController.isLoggedIn,(req, res) => {
    let name = req.body.name;
    res.redirect('/show/'+name);
    
})
router.get('/showFinal/:id',authController.isLoggedIn,(req,res)=>{
    fetch('https://www.superheroapi.com/api.php/2540844492728712/' + req.params.id)
        .then(response => response.json())
        .then(data => {
            db.query("select *,TIMESTAMPDIFF(day,CURRENT_TIMESTAMP,Entry_date) as days_ago from Comment INNER JOIN users ON Comment.id = users.id where Comment.Hero_id="+req.params.id,(err,results,fields)=>{
                if(err)
                    console.log(err);
                else
                res.render("showFinal", { data: data, Qvalue: results, user : req.user,id : req.params.id });
            })
            
        }
    );        
})

router.get('/showFinal/:id/newComment',authController.isLoggedIn,(req,res)=>{
    if(req.user){
        res.render("AddComment", {id: req.params.id, user : req.user});
    }else{
        res.redirect('/login');
    }
})

router.post('/showFinal/:id/newComment',authController.isLoggedIn,(req,res)=>{
    if(req.user){
        db.query("INSERT INTO Comment(id,Hero_id,Val) VALUES('"+req.user.id+"',"+req.params.id+",'"+req.body.comment+"')",(err,results,fields)=>{
            if(err)
                console.log(err);
        })
        res.redirect("/showFinal/"+req.params.id);
    }else{
        res.redirect('/login');
    }
})

router.post('/showFinal/:id/:C_id',authController.isLoggedIn,(req,res)=>{
    if(req.user){
        db.query("DELETE FROM Comment WHERE C_id="+req.params.C_id,(err,results,fields)=>{
            if(err)
                console.log(err);
        })
        res.redirect("/showFinal/"+req.params.id);
    }else{
        res.redirect('/login');
    }
})

module.exports = router;