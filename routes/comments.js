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

// you come here with route /showfinal/comments/

// add comment url - /showfinal/:Hero_id/comments/addComment/
router.post('/:Hero_id/addComment/',authController.isLoggedIn,(req,res)=>{
    if(req.user){
        db.query("INSERT INTO Comment(id,Hero_id,Val) VALUES('"+req.user.id+"',"+req.params.Hero_id+",'"+req.body.comment+"')",(err,results,fields)=>{
            if(err)
                console.log(err);
        })
        res.redirect("/showFinal/"+req.params.Hero_id);
    }else{
        res.redirect('/login');
    }
})


// update comment url - /showfinal/:Hero_id/comments/updateComment/:C_id
router.post('/:Hero_id/updateComment/:C_id',authController.isLoggedIn,(req,res)=>{
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

// delete comment url - /showfinal/:Hero_id/comments/deleteComment/:C_id
router.post('/:Hero_id/deleteComment/:C_id',authController.isLoggedIn,(req,res)=>{
    if(req.user){
        async function deletecomment(){
            db.query("DELETE FROM Comment WHERE C_id="+req.params.C_id,(err,results,fields)=>{
                if(err)
                    console.log(err);
            })
            res.redirect('/showFinal/'+req.params.Hero_id);
        }
        deletecomment();
    }else{
        res.redirect('/login');
    }
})

module.exports = router;