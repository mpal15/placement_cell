var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/placement_file")
.then(()=>{
    console.log("database connected suceefully");
},(err)=>{
    console.log("error is occured",err)
})