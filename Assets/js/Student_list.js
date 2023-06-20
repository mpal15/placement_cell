  var student_container = document.getElementsByClassName("Student-container")[0];
window.addEventListener('load',async function(){
  var res =await this.fetch("/users/Student_list");
  var data= await res.json();
  console.log(data);


  for(var i=0;i<data.student_list.length;i++)
  {
    var student_div = document.createElement('div');
    student_div.setAttribute('class','row my-3');
   var student_name = this.document.createElement('span');
   student_name.innerHTML = data.student_list[i].name;
   student_name.setAttribute('class','col-6');
   student_div.appendChild(student_name);
//    student_profile btn
var profile = document.createElement('button');
profile.innerHTML = "profile"
profile.setAttribute('class','col-3 btn btn-success');
profile.setAttribute('id',`${data.student_list[i]._id}`);
student_div.appendChild(profile);
profile.addEventListener('click',function(e){
  var profile_id = e.target.getAttribute('id');
  window.location.href=`/users/student_profile/${profile_id}`;
})

//student set interview
var interview = document.createElement('button');
interview.innerHTML = "interview";
interview.setAttribute('class','col-3 btn btn-danger');
interview.setAttribute('id',`${data.student_list[i]._id}`);
student_div.appendChild(interview);
interview.addEventListener('click',function(e){
  var id = e.target.getAttribute('id');
   window.location.href = `/users/student_interview/${id}`;
})



student_container.appendChild(student_div);

  }



})