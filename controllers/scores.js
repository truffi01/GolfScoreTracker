const express = require("express"); 
//need to use the express router
const router = express.Router(); 
const mongoose = require('mongoose'); 
const Scoret = require("../models/Score")


router.get("/", (req,res) => {
   res.render("scores", {viewTitle: "Insert Score" });
});

router.get("/lists", (req,res) => {
    res.render('scorelist'); 
}); 

router.post("/", (req,res) => {
    let newScore = new Scoret ();
    console.log(req.body); 
    newScore.Course = req.body.Course;
    newScore.Scorey = req.body.Scorey;
    newScore.save((err,doc) =>{
        if (!err) {res.redirect("/scores/lists")}
    else {console.log("error: " + err)}
    
    })
});






module.exports = router