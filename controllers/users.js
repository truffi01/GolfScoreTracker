//user information routes login, new user 

const express = require("express"); 

//need to use the express router
const router = express.Router(); 

//whenever we want to create a route we just do router.(method). "/login" . than in app.js have to add routes. app.use("/", )

//.login Page
router.get("/Login", (req,res) => {
    res.send("Login Golf App Page")
});


//.register new user page 
router.get("/Register", (req,res) => {
    res.send("Register Golf App Page")
});







module.exports = router 