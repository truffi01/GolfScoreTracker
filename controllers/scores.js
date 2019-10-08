const express = require("express"); 
//need to use the express router
const router = express.Router(); 
const mongoose = require('mongoose'); 
const Scorets = require("../models/Score")


router.get("/", (req,res) => {
   res.render("scores", {viewTitle: "Insert Score" });
});



router.post("/", (req,res) => {
    var newScore = new Scorets ();
    newScore.Course = req.body.Course;
    newScore.Scorey = req.body.Scorey;
    newScore.save((err,doc) =>{
        if (!err) {res.redirect("/scores/scorelist")}
    else {console.log("error: " + err)}
    
    })
});
//problem with database was scorets was labeled on mongo atlas db and I need to use scorets not scoret. Mongo added an s. Always match the database with the correct capitalization on your code from atlas. 
router.get("/scorelist", (req,res) => {
    
    Scorets.find((err, docs) => { 
        if (!err){
            res.render("scorelist", {
                list: docs
            });
        }
        else {console.log("error" + err);
    }
    });
}); 

router.get("/:id", (req, res) => {
    Scorets.findById(req.params.id, (err,doc) => {
        if (!err) {
            res.render("scorelist", {
                viewTitle: "Update Score",
                newScore: doc
            })
        }
    }); 
});

module.exports = router