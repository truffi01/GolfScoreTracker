//bring in express 
const express = require("express"); 
const app = express();
const mongoose = require("mongoose"); 

const hbs = require("express-handlebars");
const parser = require("body-parser");

//setting up dB
const dataBase = require("./dB/connection").MongoURI;

mongoose.connect(dataBase, { useNewUrlParser: true }) 
  .then(() => console.log("Mongo Connected")); 


app.use(parser.urlencoded({ extended: true }));
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