let express = require("express");
let app = express();
let bodyparser = require("body-parser");
let methodOverride = require("method-override");
const fetch = require("node-fetch");

app.use(express.static(__dirname+"/public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
	res.render("landing");
});

app.post("/", function (req, res) {
	let name = req.body.name;
	fetch('https://www.superheroapi.com/api.php/2540844492728712/search/' + name)
		.then(response => response.json())
		.then(data => {
			console.log(data.results);
			res.render("show", { data: data.results });
		}
		);
});

let port = 3000;
app.listen(port, function () {
	console.log("Server has Started");
});