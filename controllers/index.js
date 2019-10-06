//homepage of the app 

const express = require("express"); 
//need to use the express router
const router = express.Router(); 

const {ensureAuthenticated} = require("../config/Logout");

//whenever we want to create a route we just do router.(method). "/" homepage or index page. than in app.js have to add routes. app.use("/", )
router.get("/", (req,res) => {
    res.render("welcome");
})


router.get("/dashboard", ensureAuthenticated, (req,res) => {
    res.render("dashboard", {
        name: req.user.Name
    });
})






module.exports = router 