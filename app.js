let express = require("express");
let app = express();
let bodyparser = require("body-parser");
let methodOverride = require("method-override");
const showroute = require('./routes/showroute');

var ejs = require('ejs');

// let con = mysql.createConnection({
// //   connectionLimit: 50,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "MyDb"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

app.use(express.static(__dirname+"/public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
	res.render("landing");
});

app.use("/show", showroute);

let port = 3000;
app.listen(port, function () {
	console.log("Server has Started");
});