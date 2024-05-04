const Student = require("../models/Student")
const Assignment = require("../models/Assignment")
const Results = require("../models/Results")
const Attendance = require("../models/Attendance")
const Course = require("../models/Course")



const checkstudentlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const student = await Student.findOne(input)
     response.json(student)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };
 const viewcourses= async (request, response) => 
 {
    try 
    {
      const course = await Course.find();
      if(course.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(course);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const changestudentpwd = async (request, response) => {
    try 
    {
      const { username, oldpassword, newpassword } = request.body;

      const student = await Student.findOne({ username, password: oldpassword });
      
       if (!student) 
      {
        response.status(400).send('Invalid Old Password');
      }
      else
      {
          if(oldpassword==newpassword)
          {
            response.status(400).send('Both Passwords are Same');
          }
          else
          {
            await Student.updateOne({username},{ $set: { password: newpassword } });
             response.json('Password Updated Successfully');
          }
        
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const studentprofile = async (request, response) => 
  {
     try 
     {
       const email = request.params.email
       const student = await Student.findOne({email})
       if(student)
       {
         response.json(student)
       }
       else
       {
         return response.status(200).send('Student not found with the provided email id');
       }
       
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };
   const viewassignments = async (req, res) => { 
    try { 
      const assignments = await Assignment.find(); 
      res.status(200).json(assignments); 
    } catch (error) { 
      res.status(500).send(error.message); 
    } 
  };
   




  const registercourse = async (request, response) => {
    try {
      const input = request.body;
      // Assuming you have a Course model defined
      const course = new Course(input);
      await course.save();
      response.status(200).send('Course Registered Successfully');
    } catch (e) {
      response.status(500).send(e.message);
    }
  };
  
  
  
 


 module.exports = {checkstudentlogin,viewcourses,viewassignments,changestudentpwd,studentprofile,registercourse}