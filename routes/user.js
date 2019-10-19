const express = require('express')
const  router =express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
// const {ensureAuthenticated} = require('../config/auth')

//Model

const User = require('../model/user')

//Login
router.get('/login',(req, res)=> res.render('user/login'))

//Register
router.get('/signup',(req, res)=> res.render('user/signup',))

//profile
router.get('/profile', (req, res)=> res.render('user/profile'))

//REgister handle
router.post('/signup', (req, res)=>{
    const {name, email, password, password1} = req.body
    let errors = []

    if (password !== password1)
    {
        errors.push({msg:'Password do not match'})
    }
    if (password.length < 6){
        errors.push({msg:'Password contain atleat 6 Carcters'})
    }

    if(errors.length > 0){
        req.flash(errors)
        console.log(errors.msg)
        res.render('user/signup',{
            errors,name,email, password, password1
        })
    }
    else{
        //Validation passed
        User.findOne({email:email})
        .then(user=>{
            //User exisr
            if(user){
                errors.push({msg:'email already exist'})
                req.flash('error_msg', errors.msg)
                console.log(errors.msg)
                res.render('user/signup',{
                    errors,
                    name,
                    email,
                    password,
                    password1
                })
            }else{
                const newuser = new User({
                    name,
                    email,
                    password
                })
                //hash passsword
                bcrypt.genSalt(10,(err, salt)=>{
                    bcrypt.hash(newuser.password, salt, (err, hash)=>{
                    // if (err) throw err;
                    
                        //set password to hash
                        newuser.password = hash
                        //save user
                        newuser.save()
                        .then(user=>{
                            req.flash('success_msg', 'welcome')
                            res.redirect('profile')
                        })
                        .catch(err=>console.log(err))
                    
                    })
                })
                console.log(newuser)
                
            }
        }).catch(err => console.log(err));
    }
    
})

//Login handle

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { 
            console.log(req.body)
             return res.redirect('login') }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('profile')
        });
      })(req, res, next)
})

//LOGIN

router.get('/logout', (req, res)=>
{
    req.logOut()
    req.flash('success_msg', 'logout successfully')
    res.redirect('login')
})

module.exports =router