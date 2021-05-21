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


router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.user
    });
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/profile', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('profile', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }
})

// router.use('/show',authController.isLoggedIn,(req,res)=>{
//     if(req.user){
//         res.redirect('./showroute.js');
//     }else{

//     }
// })

router.post('/show',(req, res) => {
    let name = req.body.name;
    fetch('https://www.superheroapi.com/api.php/2540844492728712/search/' + name)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
            res.render("show", { data: data.results });
        }
    );
})
router.get('/show/:id',(req,res)=>{
    fetch('https://www.superheroapi.com/api.php/2540844492728712/' + req.params.id)
        .then(response => response.json())
        .then(data => {
            db.query("select * from Comment INNER JOIN users ON Comment.id = users.id where Comment.Hero_id="+req.params.id,(err,results,fields)=>{
                if(err)
                    console.log(err);
                else
                res.render("showFinal", { data: data, Qvalue: results });
            })
            
        }
    );        
})

router.get('/show/:id/newComment',authController.isLoggedIn,(req,res)=>{
    if(req.user){
        res.render("AddComment", {id: req.params.id});
    }else{
        res.redirect('/login');
    }
})

router.post('/show/:id/newComment',authController.isLoggedIn,async(req,res)=>{
    if(req.user){
        db.query("INSERT INTO Comment(id,Hero_id,Val) VALUES('"+req.user.id+"',"+req.params.id+",'"+req.body.comment+"')",(err,results,fields)=>{
            if(err)
                console.log(err);
        })
        res.redirect("/show/"+req.params.id);
    }else{
        res.redirect('/login');
    }
})


module.exports = router;