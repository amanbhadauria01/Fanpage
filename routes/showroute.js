const route = require('express').Router()
const fetch = require("node-fetch");

route.get('/',function(req,res){

})

route.post('/', function (req, res) {
	let name = req.body.name;
	fetch('https://www.superheroapi.com/api.php/2540844492728712/search/' + name)
		.then(response => response.json())
		.then(data => {
			console.log(data.results);
			res.render("show", { data: data.results });
		}
		);
})

module.exports = route