var express = require('express')
var router = express.Router()
var product = require('../model/product')
// var csurf = require('csurf')
const passport = require('passport')


// const csrufprotection = csurf()
// router.use(csrufprotection)

/* GET home page. */
router.get('/', (req, res, next)=>{
    product.find((err, docs)=>{
      var productchunks=[]
      var chunksize = 4
      for(var i = 0; i < docs.length; i+=chunksize){
        productchunks.push(docs.slice(i, i+chunksize))
      }
      res.render('shop/index', { title: 'Shoping cart', products:productchunks })
    })
  
})


// USER router

// router.post('/user/signup',passport.authenticate('local.signup',{
//   successRedirect:'/profile',
//   failureRedirect:'/signup',
//   failureFlash:true
// }))


// router.get('/user/signup',(req, res, next)=>{
//   res.render('user/signup')
//   // res.render('user/signup',{csrfToken:req.csrfToken()})
// })

router.get('/profile', (req, res)=>{
  res.render('user/profile')
})
module.exports = router
