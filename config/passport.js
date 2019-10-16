const passport = require('passport')
const local = require('passport-local').Strategy
const user = require('../model/user')

//To store the user session
passport.serializeUser((user, done)=>
{
    done(null, user.id)
})

passport.deserializeUser((id, user)=>
{
    user.findById(id, (err, user)=>{
        done(err, user)
    })
})

passport.use('local.signup', new local({
    usernameFeild:'email',
    passwordFeild:'password',
    passReqToCallback:true
},(req, email, password, done)=>{
    user.findOne({'email':email}, (err, user)=>{
        if(err){
            return done(err)
        }
        if(user){
            return done(null, false, {meassage:'email already in use'})
        }
        const newUser = new user()
        newUser.email = email
        newUser.passport = newUser.encryptpassword(passport)
        newUser.save((err, res)=>{
          if(err){
              return done(err);
          }  
          return done(null, newUser);
    })
})}))