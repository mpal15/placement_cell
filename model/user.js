var mongoose = require("mongoose");
var userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        student:{
            type:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Student"
            }]
        }
    }
);


var User = mongoose.model('User',userSchema);
module.exports = User;