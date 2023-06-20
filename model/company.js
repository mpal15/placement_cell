var mongoose = require("mongoose");
var CampanySchema = new mongoose.Schema(
    {
        Campany_name:{
            type:String,
            required:true
        },
        Date:{
            type:String,
            required:true
        },
        Student:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Student"
            }
        ]
     }
);
var Campany = mongoose.model('Campany',CampanySchema);
module.exports = Campany;