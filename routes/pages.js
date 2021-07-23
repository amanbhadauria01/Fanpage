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
            // console.log(data.results);
            res.render("show", { data: data.results , user : req.user});
        }
    );
})

router.post('/show',authController.isLoggedIn,(req, res) => {
    let name = req.body.name;
    res.redirect('/show/'+name);
    
})
//
router.get('/showFinal/:id',authController.isLoggedIn,(req,res)=>{
    fetch('https://www.superheroapi.com/api.php/2540844492728712/' + req.params.id)
        .then(response => response.json())
        .then(data => {
            db.query("select *,TIMESTAMPDIFF(MINUTE,CURRENT_TIMESTAMP,Entry_date) as minutes_ago from Comment INNER JOIN users ON Comment.id = users.id where Comment.Hero_id="+req.params.id,(err,results,fields)=>{
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

// update comment
router.post('/showFinal/updateComment/:Hero_id/:C_id',authController.isLoggedIn,(req,res)=>{
    if(req.user){
        // finding old timestamp value
        db.query("select * FROM Comment INNER JOIN users ON Comment.id = users.id WHERE Comment.Hero_id="+req.params.Hero_id + " AND Comment.C_id = " + req.params.C_id,(err,results,fields)=>{
            if(err)
                console.log(err);
            else{
                // if old timestamp value is found , update the comment
                db.query("UPDATE Comment SET Val='"+req.body.comment + "'  " +
                                            //  "Entry_date = "  +   results[0].Entry_date +
                         " WHERE Hero_id = "+ req.params.Hero_id+" AND C_id =" + req.params.C_id +
                         " AND id =" + req.user.id,
                         (err,results,fields)=>{
                    if(err)    console.log(err);
                    else       res.redirect('/showFinal/'+req.params.Hero_id);
                }); 
            }
        })        

    }else{
        res.redirect('/login');
    }
})

//
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
        console.log('here3');
        console.log('sfsdofsnd' + req.params.C_id);
        async function deletecomment(){
            await timeout(5000);
            console.log('here4');
            db.query("DELETE FROM Comment WHERE C_id="+req.params.C_id,(err,results,fields)=>{
                if(err)
                    console.log(err);
            })
            res.redirect("/showFinal/"+req.params.id);
        }
        deletecomment();
    }else{
        res.redirect('/login');
    }
})


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = router;