var mongoose = require("mongoose");
var Animal = mongoose.model("Animal");

module.exports = {
    index: function(req, res){
        Animal.find({}, function(err, animals){
            if(err){
                res.render("index", {animals:{}});
            } else {
                res.render("index", {animals:animals});
            }
        });
    },

    new: function(req, res){
        res.render("new", {errors : {}});
    },
    
    create: function(req, res){
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
    },

    show: function(req, res){
        Animal.findOne({_id: req.params.id}, function(err, animal){
            if(err){
                res.redirect("/");
            } else {
                res.render("show", {animal:animal});
            }
        });
    },

    edit: function(req, res){
        Animal.findOne({_id: req.params.id}, function(err, animal){
            if(err){
                res.redirect("/");
            } else {
                res.render("edit", {errors:{}, animal:animal});
            }
        });
    },

    update: function(req, res){
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
    },

    destroy: function(req, res){
        Animal.remove({_id: req.params.id}, function(err){
            res.redirect("/");
        });
    }
}