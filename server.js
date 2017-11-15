var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.set("views", __dirname + "/client/views");
app.set("view engine", "ejs")

require("./server/config/mongoose.js");

var routes = require("./server/config/routes.js");
routes(app);

app.listen(8000, function(){
    console.log("listening on port 8000");
});