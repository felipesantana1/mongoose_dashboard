var mongoose = require("mongoose");

var AnimalSchema = new mongoose.Schema({
    species: {type:String, required:true},
    name: {type:String, required:true},
    description: {type:String, required:true}
}, {timestamps:true});

mongoose.model("Animal", AnimalSchema);

var Animal = mongoose.model("Animal");

mongoose.Promise = global.Promise;