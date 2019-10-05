const passporty = require("passport-local").Strategy;
const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs");


const User = require("../models/User");







module.exports = function (passport) {
    passport.use(
        new passporty({ usernameField: "email"}, (email, password, done) => {
            //check to see if there is a user with email 
            User.findOne({email: email })
            //if there is no match return done
            .then(user => {
                if (!user){
                    return done(null, false, {message: "That email is not in the system"}); 
                }

                //Match the password. Need to use bcrypt in databse it is hatched they use the keyboard which is not
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user); 
                    } else {
                        return done(null, false, {message: "Password is not correct"})
                    }
                });

            }) 
        })
    ); 

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}


