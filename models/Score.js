const mongoose = require("mongoose"); 

const ScoreSchema = new mongoose.Schema({
    Course : {
        type: String, 
        required: true
    },
    Score : {
        type: String, 
        required: true
    },
   
});

const Score = mongoose.model("Score", ScoreSchema);

module.exports = Score; 