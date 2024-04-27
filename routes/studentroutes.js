// student routes

const studentcontroller = require("../controllers/studentcontroller")

const express = require("express")
const studentrouter = express.Router()


studentrouter.post("/checkstudentlogin",studentcontroller.checkstudentlogin)
studentrouter.get("/viewcourses",studentcontroller.viewcourses)
studentrouter.get("/viewassignments",studentcontroller.viewassignments)
studentrouter.put("/changestudentpwd",studentcontroller.changestudentpwd)
studentrouter.get("/studentprofile/:email",studentcontroller.studentprofile)
studentrouter.get("/viewattendence",studentcontroller.viewattendance)
studentrouter.get("/viewresults",studentcontroller.viewresults)
studentrouter.post("/registercourse",studentcontroller.registercourse)
module.exports = studentrouter