const express = require('express')
const  router =express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')



//Model
const User = require('../model/user')

//profile
router.get('/profile',isAuthenticated, (req, res)=> res.render('user/profile'))

router.use('/', forwardAuthenticated, (req, res, next)=>{
    next()
})

//Register
router.get('/signup',(req, res)=> res.render('user/signup',))

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
                // req.flash('error_msg', errors[msg])
                console.log(errors)
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
                            // req.session.email = email;
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

//Login
router.get('/login',(req, res)=> res.render('user/login'))

//Login handle

router.post('/login', (req, res, next)=>{
    const {email} = req.body
    let errorss = []
    passport.authenticate('local', (err, user, info)=> {
        if (err) { return next(err); }
        // if (user.email !== email) {
        //     console.log(errorss)
        //     errorss.push({msg:'Email not exist'})
        //     return res.render('user/login', {errorss, email})
        // }
        if(!user){    
            console.log(req.body)
            errorss.push({msg:'Email or password is incorrect'})
            console.log(errorss)
        return res.render('user/login', {errorss, email}) 
        }
           
        req.logIn(user, (err)=> {
          if (err) { return next(err); }
        //   req.session.email = email;
          res.redirect('profile')
        })
      })(req, res, next)
})

//LOgout

router.get('/logout', (req, res)=>
{
    req.logOut()
    req.flash('success_msg', 'logout successfully')
    // delete req.session.email;
    res.redirect('login')
})

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/user/signup');
  }
function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');      
 }

module.exports =router;
