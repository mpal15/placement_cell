var express = require("express");
var route  = express.Router();
var Home = require("../Controller/home");
route.get("/",Home.home);
route.use("/users",require('./user'))
module.exports = route;