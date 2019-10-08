const mongoose = require("mongoose"); 

const ScoreSchema = new mongoose.Schema({
    Course : {
        type: String, 
        required: true
    },
    Scorey : {
        type: String, 
        required: true
    },
   
});

const Scorets = mongoose.model("Scoret", ScoreSchema);

module.exports = Scorets; 