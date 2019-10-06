const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs");

const User = require("../models/User");


module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "Email"}, (Email, Password, done) => {
            //check to see if there is a user with email 
            User.findOne({Email: Email })
            .then(user => {
                if (!user){
                    return done(null, false, {message: "That email is not in the system"}); 
                }
                
                //Match the password. Need to use bcrypt in databse it is hatched they use the keyboard which is not
                bcrypt.compare(Password, user.Password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user); 
                    } else {
                        return done(null, false, {message: "Password is not correct"})
                    }
                });

            })
            .catch(err => console.log(err)); 
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


