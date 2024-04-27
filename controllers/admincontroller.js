const Admin = require("../models/Admin");
const Faculty = require("../models/Faculty");
const Student = require("../models/Student");
const Course = require("../models/Course")
const FacultyCourseMap = require("../models/FacultyCourseMap")




const checkadminlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const admin = await Admin.findOne(input)
     response.json(admin)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };


 const addstudent = async (request, response) => {
  try 
  {
    const input = request.body;
    const student = new Student(input);
    await student.save();
    response.status(200).send('Student Added Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
};

const addfaculty = async (request, response) => {
  try 
  {
    const input = request.body;
    const faculty = new Faculty(input);
    await faculty.save();
    response.status(200).send('Faculty Added Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
};

const addcourse = async (request, response) => {
  try 
  {
    const input = request.body;
    const course = new Course(input);
    await course.save();
    response.status(200).send('Course Added Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
};


const viewstudents = async (request, response) => 
{
   try 
   {
     const students = await Student.find();
     if(students.length==0)
     {
       response.status(200).send("DATA NOT FOUND");
     }
     else
     {
       response.json(students);
     }
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };



 const deletestudent = async (request, response) => 
{
   try 
   {
     const sid = request.params.studentid
     const student = await Student.findOne({"studentid":sid})
     if(student!=null)
     {
       await Student.deleteOne({"studentid":sid})
       response.status(200).send("Student Deleted Successfully")
     }
     else
     {
       response.status(200).send("Student ID Not Found")
     }

   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };

 const viewfaculty = async (request, response) => 
{
   try 
   {
     const faculty = await Faculty.find();
     if(faculty.length==0)
     {
       response.status(200).send("DATA NOT FOUND");
     }
     else
     {
       response.json(faculty);
     }
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };



 const deletefaculty = async (request, response) => 
{
   try 
   {
     const fid = request.params.facultyid
     const faculty = await Faculty.findOne({"facultyid":fid})
     if(faculty!=null)
     {
       await Faculty.deleteOne({"facultyid":fid})
       response.status(200).send("Faculty Deleted Successfully")
     }
     else
     {
       response.status(200).send("Faculty ID Not Found")
     }

   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };

 const viewcourses = async (request, response) => 
 {
    try 
    {
      const courses = await Course.find();
      if(courses.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(courses);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
 
 
 
  const deletecourse = async (request, response) => 
 {
    try 
    {
      const ccode = request.params.coursecode
      const courses = await Course.findOne({"coursecode":ccode})
      if(courses!=null)
      {
        await Course.deleteOne({"coursecode":ccode})
        response.status(200).send("Course Deleted Successfully")
      }
      else
      {
        response.status(200).send("Course Code Not Found")
      }
 
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
 
  const changeadminpwd = async (request, response) => {
    try 
    {
      const { username, oldpassword, newpassword } = request.body;

      const admin = await Admin.findOne({ username, password: oldpassword });
      
       if (!admin) 
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
            await Admin.updateOne({username},{ $set: { password: newpassword } });
             response.json('Password Updated Successfully');
          }
        
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  
  const allocateFacultyToCourse = async (req, res) => {
    try {
      const { courseId, facultyId, sectionId } = req.body;
      const allocation = new FacultyCourseMap({ course:courseId, faculty: facultyId, section: sectionId });
  
      // Save the allocation to the database
      await allocation.save();
  
      res.send("Faculty allocated to course successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  const viewcoursefacultyallocation = async (req, res) => {
    try {
      const courseFacultyAllocations = await CourseFacultyAllocation.find()
       
      
      if (courseFacultyAllocations.length === 0) {
        res.send("No course faculty allocations found");
      } else {
        res.json(courseFacultyAllocations);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

 module.exports = {checkadminlogin,addstudent,deletestudent,viewstudents,addfaculty,viewfaculty,deletefaculty,addcourse,viewcourses,deletecourse,changeadminpwd,allocateFacultyToCourse,viewcoursefacultyallocation }