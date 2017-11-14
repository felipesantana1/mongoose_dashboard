var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost/mongoose_dash" ,{useMongoClient:true});

var AnimalSchema = new mongoose.Schema({
    species: {type:String, required:true},
    name: {type:String, required:true},
    description: {type:String, required:true}
}, {timestamps:true});

mongoose.model("Animal", AnimalSchema);

var Animal = mongoose.model("Animal");

mongoose.Promise = global.Promise;

app.get("/", function(req, res){
    Animal.find({}, function(err, animals){
        if(err){
            res.render("index", {animals:[]});
        } else {
            res.render("index", {animals:animals});
        }
    });
});

app.get("/animals/new", function(req, res){
   res.render("new", {errors : {}});
});

app.post("/animals", function(req, res){
    let animal = new Animal({
        species: req.body.species,
        name: req.body.name,
        description: req.body.desc
    });
    animal.save(function(err){
        if(err){
            res.render("new", {errors: animal.errors});
        } else {
            res.redirect("/");
        }
    });
});

app.get("/animals/:id", function(req, res){
    Animal.findOne({_id: req.params.id}, function(err, animal){
        if(err){
            res.redirect("/");
        } else {
            res.render("show", {animal:animal});
        }
    });
});

app.get("/animals/edit/:id", function(req, res){
    Animal.findOne({_id: req.params.id}, function(err, animal){
        if(err){
            res.redirect("/");
        } else {
            res.render("edit", {errors:{}, animal:animal});
        }
    });
});

app.post("/animals/:id", function(req, res){
    Animal.findOne({_id: req.params.id}, function(err, animal){
        if(err){
            res.redirect("/");
        } else {
            animal.name = req.body.name;animal.species = req.body.species;animal.descritpion = req.body.desc;animal.save(function(err){
                if(err){
                    res.render("edit", {errors: animal.errors});
                } else {
                    res.redirect("/");
                };
            });
        };
    });
});

app.post("/animals/destroy/:id", function(req, res){
    Animal.remove({_id: req.params.id}, function(err){
        res.redirect("/");
    });
});
app.listen(8000, function(){
    console.log("listening on port 8000");
});