const express = require("express");
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyparser = require("body-parser");
const methodOverride = require("method-override");
const showroute = require('./routes/showroute');
const ejs = require('ejs');
dotenv.config({path : './.env'});


const db = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

db.on('error', error =>  console.log(error));

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Mysql connected');
    }
})

module.exports = (connectParams, onError) => {
    const connection = mysql.createConnection(connectParams);
    connection.on('error', onError);
    return connection;
 }


app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use('/',require('./routes/pages.js'));
app.use('/auth',require('./routes/auth.js'));

let port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server has Started");
});