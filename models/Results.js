const mongoose = require("mongoose");

const resultschema = new mongoose.Schema({
    studentname:{
     type: String,
     require: true
    },
    coursetitle: {
        type: String,
        required: true,
        unique: true
    },
    coursecode: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: ['CSE-HONORS', 'CSE-Reg', 'CSIT', 'AIDS', 'ECE', 'other']
    },
    academicyear: {
        type: String,
        required: true,
        enum: ['2023-24', '2024-25', '2025-26']
    },
    semester: {
        type: String,
        required: true,
        enum: ['ODD', 'EVEN']
    },
    result:{
        type: String,
        required:true,
        enum:['PASS','FAIL']

    }
    
});

const results = mongoose.model('results', resultschema);

module.exports = results;