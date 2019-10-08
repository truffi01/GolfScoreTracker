const express = require("express"); 
//need to use the express router
const router = express.Router(); 

router.post("/scores", (req,res) => {
    res.render("welcome");
})







module.exports = router 