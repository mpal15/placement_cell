var User = require("../model/user")
var Student = require("../model/student");
var Campany = require("../model/company");
var ObjectsToCsv = require('objects-to-csv');
var Download = require('download');


module.exports.login = function(req,res){
   return res.render("user_login")
}
module.exports.signup = function(req,res){
    return res.render("user_signup")
}
module.exports.signupPost = async function(req,res){
    console.log(req.body);
    if(req.body.password !== req.body.confirm_password)
    {
        return res.redirect('back');
    }
    else{
        var email = req.body.email;
        var user = await User.findOne({
            email:email
        })
        if(user){
            return res.redirect("/users/login_form");
        }
        else{
             await User.create({
                name:req.body.name,
                email:email,
                password:req.body.password,
                confirm_password:req.body.confirm_password
             })
             return res.redirect("/users/login_form");
        }
    }
}

module.exports.SignInPost = function(req,res){
    return res.redirect('/users/profile');
}

module.exports.profile = async (req,res) => {

    if (req.isAuthenticated()){

        var companies = await Campany.find({});
        var CompanyList = [];
     
       
        for (var i = 0; i < companies.length;i++)
        {
           var campany_data = {};
           campany_data.id = companies[i].id;
           campany_data.name = companies[i].Campany_name;
           campany_data.date = companies[i].Date;
           campany_data.students = [];
           for(var j = 0; j < companies[i].Student.length; j++){
               var student = await Student.findById(companies[i].Student[j]);
               campany_data.students.push(student);
           }
   
           CompanyList.push(campany_data);
   
   
        }
    

        return res.render('profile',{CompanyList});

    }else{
        return res.redirect('/users/login_form');
    }

 

}
module.exports.Student_list = async function(req,res){
   
   try{

    var user_student = await User.findById(req.user.id);
    var students = user_student.student;
    var student_list = [];
    for(var i=0;i<students.length;i++){
        var student = await Student.findById(students[i]);
        student_list.push(student);
    }
    return res.status(401).json({success:true,student_list});
   } 
   catch(err){
    console.log(err);
    return res.status(401).json({success:false});
   }
}

module.exports.addnewStudent =async function(req,res){

    try{
       
       var student =  await Student.create(req.body);
       var user = await User.findById(req.user.id);
        user.student.push(student.id);
        user.save();
        return res.redirect("back");
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }

}
module.exports.logout =  function(req,res){
  req.logout((err)=>{
    if(err){
        console.log(err);
        return res.redirect('/users/login_form');
    }


  })
  return res.redirect('/users/login_form');
}
module.exports.admin_profile = async function(req,res){
  try{
     var data =  await User.findById(req.user.id);
   



     return res.render('user_profile.ejs',{name:data.name,email:data.email});
  }
  catch(err){
    console.log(err);
  }
}
module.exports.Campany_post = async function(req,res){
    try{
     await Campany.create(req.body);
     return res.redirect('/users/profile');
    }
    catch(err){
      console.log(err);
      return res.redirect('/users/profile');
    }
}

module.exports.Campany = async function (req,res){
   return res.render('Campany');
}

module.exports.student_interview = async function(req,res){
    var id= req.params.id;
    var campanie = await Campany.find({});
    var campanies_list = [];
    for(var i=0;i<campanie.length;i++){
        var campanies={};
        campanies.id = campanie[i].id;
        campanies.name = campanie[i].Campany_name;
        campanies_list.push(campanies);
    }
    return res.render('student_interview',{campanies_list,id});
}
module.exports.students_interview = async function(req,res){
    console.log(req.body);
    var student_id = await Student.findById(req.body.Student_id);
    var campany = await Campany.find({});
    for(var i=0;i<campany.length;i++){
        if(campany[i].Student.indexOf(student_id.id)!=-1){
           return res.redirect('/users/profile');
        }
    }
    var campany_id = await Campany.findOne({Campany_name:req.body.Campany_name})
    student_id.Status = req.body.status;
    student_id.Campany = campany_id.Campany_name;
    student_id.save();
    campany_id.Student.push(student_id.id);
    campany_id.save();
    return res.redirect('/users/profile');
}

module.exports.Delete =  async function(req,res){
    console.log(req.params.id);
    try{
         await Campany.findByIdAndDelete(req.params.id);
    }
    catch(err){
        console.log(err);
       }
        return res.redirect('back');
  }

  module.exports.student_profile = async function(req,res){
    console.log(req.params.id);
      try{
    //    var campany =await Campany.find({});
    //   var data=[];
    //    for(var i=0;i<campany.length;i++){
    //      var student_details = {};
        //   if(campany[i].Student.indexOf(req.params.id)!=-1){
            // var student = await Student.findById(req.params.id);
            // student_details.name=student.name;
            // student_details.email=student.email;
            // student_details.College_name=student.College_name;
            // student_details.Course=student.Course;
            // student_details.Branch=student.Branch;
            // student_details.Phone_no=student.Phone_no;
            // student_details.Batch_no=student.Batch_no;
            // student_details.Dsa_score=student.Dsa_score;
            // student_details.Web_score=student.Web_score;
            // student_details.React_score=student.React_score;
            // student_details.Status=student.Status;
            // student_details.Campany_name=campany[i].Campany_name;
            // student_details.Date=campany[i].Date;
            // data.push(student_details);
        
        //  }


        var student = await Student.findById(req.params.id);

        

       

        var data = {};

        data.name = student.name;
        data.email = student.email;
        data.College_name = student.College_name;
        data.Course = student.Course;
        data.Branch = student.Branch;
        data.Phone_no = student.Phone_no;
        data.Batch_no = student.Batch_no;
        data.Dsa_score = student.Dsa_score;
        data.Web_score = student.Web_score;
        data.React_score = student.React_score;


    

    

            
        var studentCompany = student.Campany;
       

        var company = await Campany.findOne({Campany_name : studentCompany});
        if (company){

            
            data.Campany_name = company.Campany_name;
            data.Date = company.Date;
            data.Status = student.Status;

        }
    


        

     

        


        
       




       
       return res.render('student_profile',{data});
      }
      catch(err){
         console.log(err);
         return res.redirect('back');
      }
  }
  module.exports.download = async function(req,res){
     try{

        var data = [];
          var user =  await User.findById(req.user.id);

          var students = user.student;
          for (var i = 0; i < students.length; i++) {

            var student_details = {}; 


            var student = await Student.findById(students[i]);

            student_details.name=student.name;
            student_details.email=student.email;
            student_details.College_name=student.College_name;
            student_details.Course=student.Course;
            student_details.Branch=student.Branch;
            student_details.Phone_no=student.Phone_no;
            student_details.Batch_no=student.Batch_no;
            student_details.Dsa_score=student.Dsa_score;
            student_details.Web_score=student.Web_score;
            student_details.React_score=student.React_score;
            var company = await Campany.findOne({Campany_name : student.Campany});
            if (company){
                student_details.Campany_name = company.Campany_name;
                student_details.Interview_Date = company.Date;
                student_details.Status=student.Status;

                
            }else{

                student_details.Campany_name = "NA";
                student_details.Interview_Date = "NA";
                student_details.Status= "NA";


            }

            data.push(student_details);
            
          }
        


     }catch(err){
        console.log(err);
     }


   
       
      // If you use "await", code must be inside an asynchronous function:
      (async () => {
        let csv = new ObjectsToCsv(data);
       
        // Save to file:
       await csv.toDisk('./studentDetails.csv');
    //    const file = '/images/profile.png';
    //    const filePath = `${__dirname}/files`;
  
    //    Download(file,filePath)
    //    .then(() => {
    //        console.log('Download Completed');
    //    })

    csv = new ObjectsToCsv(data);
    csv.toDisk('./studentDetails',{append : false});

       
        // Return the CSV file as string:
        console.log(await csv.toString());
      })();

      return res.download(__dirname + '/../studentDetails.csv');
  }