// models/Grade.js

const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;