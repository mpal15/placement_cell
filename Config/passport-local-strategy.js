var passport =require("passport");
var passport_local_strategy = require('passport-local').Strategy;
var User = require("../model/user");

passport.use(new passport_local_strategy({usernameField : 'email'},async function(email, password, done) {
      try{ 
      
        
        var user =  await User.findOne({ email: email });

      if(!user){
        return done(null,false);
      }
      else{
      
        if (password !== user.password){
            return done(null,false);
        }else{
            return done(null,user);

        }
       
      }
    }
    catch(err){
        return done (null,false);
    }
   
      }
))
passport.serializeUser(function(user,done){
    return done(null,user.email);
})
passport.deserializeUser( async function(email,done){
  var user = await User.findOne({email : email});
   if(!user){
    return done(null,false);
   }
   else{
    return done(null,user);
   }
})


passport.setAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;