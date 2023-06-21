var mongoose = require("mongoose");
const { Campany } = require("../Controller/user_Controller");
var studentSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        College_name:{
            type:String,
            required:true
        },
        Course:{
            type:String,
            required:true
        },
        Branch:{
            type:String,
            required:true
        },
        Phone_no:{
            type:String,
            required:true
        },
        Batch_no:{
            type:String,
            required:true
        },
        Dsa_score:{
            type:String,
            required:true
        },
        Web_score:{
            type:String,
            required:true
        },
        React_score:{
            type:String,
            required:true
        },
        Status:{
            type:String
        },
        Campany:{
            type:String
        }
    }
);
var Student = mongoose.model('Student',studentSchema);
module.exports = Student;