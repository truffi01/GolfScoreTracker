//bring in express 
const express = require("express"); 
const app = express();
const mongoose = require("mongoose"); 
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");


//passport needs to be defined in this file 
require("./config/passport")(passport);

const hbs = require("express-handlebars");
const parser = require("body-parser");

//setting up dB
const dataBase = require("./dB/connection").MongoURI;

mongoose.connect(dataBase, { useNewUrlParser: true }) 
  .then(() => console.log("Mongo Connected")); 

// Express Session 
app.use(session({
  secret: 'golf',
  resave: true,
  saveUninitialized: true,
}));

//need to put authenticate after express session middleware and between the flash 
app.use(passport.initialize());
app.use(passport.session());

//connect flash middleware 
app.use(flash());

//global variables
app.use((req, res, next) => {
  res.locals.succes_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next(); 
}); 

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// set a port in case we deploy or use a local host. A port is a communication endpoint 
app.set("port", process.env.PORT || 3000);

app.set("view engine", "hbs");

app.engine(
  ".hbs",
  hbs({
    extname: ".hbs",
    partialsDir: "views/",
    layoutsDir: "views/",
    defaultLayout: "layout"
  })
);


//user page is all of the controllers. Each get route is /Login, /Register. it will be users/login or users/register. If you go to users/login you get login page. If you go to users/
app.use("/", require("./controllers/index"));
app.use("/users", require("./controllers/users"));

//run a server 
app.listen(app.get("port"), () => {
    console.log("Golf Scorecard is running successfully");
  });