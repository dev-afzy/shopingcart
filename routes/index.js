var express = require('express')
var router = express.Router()
var product = require('../model/product')
// var csurf = require('csurf')
const passport = require('passport')
const Cart = require('../model/cart')

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

router.get('/profile', (req, res)=>{
  res.render('user/profile')
})

router.get('/cart/:id', (req, res)=>{
  var productid = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart: {})

  product.findById(productid, (err, product)=>{
    if (err){
      console.log(err)
    }
    
    cart.add(product, productid)
    req.session.cart = cart
    console.log(req.session.cart)
    res.redirect('/')
  })
})
module.exports = router
