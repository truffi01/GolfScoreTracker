//user information routes login, new user 

const express = require("express"); 

//need to use the express router
const router = express.Router(); 

const passport = require("passport");

//Bring in bcrypt
const bcrypt = require("bcryptjs");

//User model. We can now call moethods on this page on User. 
const User = require("../models/User")

//whenever we want to create a route we just do router.(method). "/login" . than in app.js have to add routes. app.use("/", )

//.login Page
router.get("/Login", (req,res) => {
    res.render("login")
});


//.register new user page 
router.get("/Register", (req,res) => {
    res.render("register");
});

//register request 
router.post("/register", (req,res) => {
    console.log(req.body); 
    const { FirstName, LastName, email, password, password2} = req.body; 

    let registererror = []
    if (!FirstName || !LastName || !email || !password ||!password2) {
        registererror.push({msg: "All Fields are Required"})
    }

    //passwords need to be the same
    if (password !== password2){
        registererror.push({msg: "Passwords need to be identical"});
    };

    //if any of these true we want to change the form
    if (registererror.length > 0) {
        res.render("register", {
            registererror, FirstName, LastName, email,
            password, password2
        });
    } else {
        //password is validated. Before we submit we have to make sure User doesnt exist. This returns a promise, so we do .then. If there is a user we want to render the register form and send an error 
        User.findOne({ email: email })
        .then(user => {
            if (user) {
                //user is in database 
                registererror.push({ msg: "Email already exists" })
                res.render("register", {
                registererror, FirstName, LastName, email,
                password, password2
                });
            } else {
                //if user doesnt exist we create a new one and ecript the password. Bring in bcrypt. Create a new User but have to save it. 
                const newUser = new User({
                    name,
                    email, 
                    password
                });
                //hash password 
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt,     (err, hash) => {
                            if(err) throw err; 
                        //set password to Hash
                            newUser.password = hash; 
                        //save user 
                            newUser.save()
                            .then(user => {
                                req.flash("success_msg", "You are officially registered");
                                //want to call flash message right before this
                               res.redirect("/users/login");
                            })
                            .catch(err => console.log(err)); 
                        }
                   )
                )
            }
        });
        
    }

    //need to let the user kno what is going on when it doesnt work


});


//need to login info
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next);
});

//logout 
router.get("/logout", (req, res) => {
    req.logout(); 
    req.flash("success_msg", "You are Logged Out");
    res.redirect("/users/login");
});







module.exports = router 