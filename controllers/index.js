//homepage of the app 

const express = require("express"); 
//need to use the express router
const router = express.Router(); 

//whenever we want to create a route we just do router.(method). "/" homepage or index page. than in app.js have to add routes. app.use("/", )
router.get("/", (req,res) => {
    res.send("welcome to the Golf Scorecard App")
})






module.exports = router 