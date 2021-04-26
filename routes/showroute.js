const route = require('express').Router()
const fetch = require("node-fetch");

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
			res.render("showFinal", { data: data });
		}
		);
});

module.exports = route