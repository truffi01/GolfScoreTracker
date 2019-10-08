//homepage of the app 

const express = require("express"); 
//need to use the express router
const router = express.Router(); 

const {ensureAuthenticated} = require("../config/Logout");

//whenever we want to create a route we just do router.(method). "/" homepage or index page. than in app.js have to add routes. app.use("/", )
router.get("/", (req,res) => {
    res.render("welcome");
})

// router.get("/scores", (req,res) => {
//     res.render("scores", {viewTitle: "Insert Score" });
// });

// router.post("/scores", (req,res) => {
//     console.log("hi"); 
// });



module.exports = router 