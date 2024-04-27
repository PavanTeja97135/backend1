const mongoose = require("mongoose")

const courseschema = new mongoose.Schema({
    coursetitle:{
     type: String,
    required: true,
    unique: true
    },
    coursecode: {
      type: Number,
      required: true,
    },
      department: {
        type: String,
        required: true,
       enum: ['CSE-HONORS','CSE-Reg','CSIT','AIDS','ECE','other'] 
      },
      academicyear: {
        type: String,
        required: true,
        enum: ['2023-24','2024-25','2025-26']
      },
      semester: {
        type: String,
        required: true,
     enum: ['ODD','EVEN']
       },
        // allocatedFaculty: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }]
  });

const course = mongoose.model('course', courseschema);

module.exports = course;