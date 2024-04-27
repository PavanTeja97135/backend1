//faculty routes

const facultycontroller = require("../controllers/facultycontroller")

const express = require("express")
const facultyrouter  = express.Router()


facultyrouter.post("/checkfacultylogin",facultycontroller.checkfacultylogin)

facultyrouter.post('/postassignment',facultycontroller.postassignment);
facultyrouter.get("/viewassignment",facultycontroller.viewassignment);

facultyrouter.put("/updatefacultyprofile",facultycontroller.updatefacultyprofile);
facultyrouter.get("/facultyprofile/:email",facultycontroller.facultyprofile);

facultyrouter.put("/changefacultypwd", facultycontroller.changeFacultypwd); // Corrected the variable name to facultyRouter


module.exports = facultyrouter
