const route = require('express').Router()
const fetch = require("node-fetch");
let mysql=require('mysql');

let con = mysql.createConnection({
	//   connectionLimit: 50,
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "MyDb"
	});
	
	con.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	});

route.get('/',function(req,res){
	res.render("landing");
});

route.post('/', function (req, res) {
	let name = req.body.name;
	fetch('https://www.superheroapi.com/api.php/2540844492728712/search/' + name)
		.then(response => response.json())
		.then(data => {
			console.log(data.results);
			res.render("show", { data: data.results });
		}
		);
});

route.get('/:id',function(req,res){
	fetch('https://www.superheroapi.com/api.php/2540844492728712/' + req.params.id)
		.then(response => response.json())
		.then(data => {
			con.query("select * from Comment where Comment.Hero_id="+req.params.id,(err,results,fields)=>{
				if(err)
					console.log(err);
				else
				res.render("showFinal", { data: data, Qvalue: results });
			})
			
		}
		);
});

route.get('/:id/newComment',function(req,res){
	res.render("AddComment", {id: req.params.id});
});

route.post('/:id/newComment',function(req,res){
	con.query("insert into Comment(User,Hero_id,Val) values('"+req.body.name+"',"+req.params.id+",'"+req.body.comment+"')",(err,results,fields)=>{
		if(err)
			console.log(err);
	})
	res.redirect("/show/"+req.params.id);
});

module.exports = route