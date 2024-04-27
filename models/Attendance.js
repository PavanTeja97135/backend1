const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentid:{
        type: String,
        required: true,
    },
    studentname: {
        type: String,
        require: true,
    },
    coursecode:{
         type: String,
         require: true,
    },
    coursename:{
        type: String,
        require: true,
    },
    percentage: {
        type: String,
        require: true,
    },

});

const attendance = mongoose.model('attendance', attendanceSchema,);   //collection name,schema

module.exports = attendance;