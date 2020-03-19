const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function (req, res) {
   console.log("Server running on port: " + port); 
});

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/index.html"); 
});