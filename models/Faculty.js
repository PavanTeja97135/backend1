const mongoose = require("mongoose")

const facultyschema = new mongoose.Schema({
    facultyid:{
     type: Number,
    required: true,
    unique: true
    },
    facultyname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required:true,
      enum: ['male', 'female', 'others']
    },
      department: {
        type: String,
        required: true,
       enum: ['CSE-HONORS','CSE-Reg','CSIT','AIDS','ECE','other'] 
      },
      qualification: {
        type: String,
        required: true,
        enum: ['BTECH','MTECH','PH.D']
      },
      designation: {
        type: String,
        required: true,
        enum: ['Prof','Assoc.Prof','Asst.Prof']
      },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      default:"klu123"
    },
    contact:{
      type: Number,
      required: true,
      unique: true
    },
     // allocatedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
    
  });

const faculty = mongoose.model('faculty', facultyschema);

module.exports = faculty;