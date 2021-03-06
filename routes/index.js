var express = require('express')
var router = express.Router()

// var csurf = require('csurf')
const passport = require('passport')
const keys = require('../config/keys');
const stripe = require('stripe')('sk_test_JbV1bq4Va4JeeMoroTktn4Tq00TKK2RT58');


var product = require('../model/product')
const Cart = require('../model/cart')
const order = require('../model/order')

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
     return res.render('shop/index', { title: 'Shoping cart', products:productchunks  })
    })
  
})

router.get('/profile', (req, res)=>{
return res.render('user/profile')
})

router.get('/shop/cart/:id', (req, res)=>{
  var productid = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart: {})

  product.findById(productid, (err, product)=>{
    if (err){
      console.log(err)
    }
    
    cart.add(product, productid)
    req.session.cart = cart
    console.log(req.session.cart)
    return res.redirect('/')
  })
})


//shoping cart
router.get('/shop/cart', (req, res, next)=>{
  if(!req.session.cart){

   return res.render('shop/cart', {product:null})

  }
  const cart = new Cart(req.session.cart)
  res.render('shop/cart', {product:cart.generatearray(), totalprice:cart.totalprice, stripePublishableKey: 'pk_test_ufpAeajoum2pZAEzsHSdsSpJ00mUMcsmGZ'}) 
})

//remove by one
router.get('/remove-one-cart/:id',(req, res)=>{
  var productid = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart: {})
  
  product.findById(productid, (err, product)=>{
    if (err){
      console.log(err)
    }
  cart.reduceByOne(productid, product)
  req.session.cart=cart
  return res.redirect('/shop/cart')
  })
})

//remove all
router.get('/removeall-one-cart/:id',(req, res)=>{
  var productid = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart: {})
  
  product.findById(productid, (err, product)=>{
    if (err){
      console.log(err)
    }
  cart.reduceitem(productid, product)
  req.session.cart=cart
  return res.redirect('/shop/cart')
  })
})

//increese the quantity
router.get('/add-one-cart/:id', (req, res)=>{
  var productid = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart: {})

  product.findById(productid, (err, product)=>{
    if (err){
      console.log(err)
    }
    
    cart.add(product, productid)
    req.session.cart = cart
    console.log(req.session.cart)
    return res.redirect('/shop/cart')
  })
})

//Checkout
router.get('/shop/checkout',isAuthenticated, (req, res, next)=>{
  if(!req.session.cart){
    return res.render('shop/cart', {product:null})
   } 
   console.log('bad')
   const cart = new Cart(req.session.cart)
   res.render('shop/checkout', { total:cart.totalprice}) 
   })

//checkout handle
router.post('/shop/checkout', isAuthenticated, (req, res, next)=>{
    if(!req.session.cart){
    console.error('no content')
    return res.render('shop/cart', {product:null, name:cart.name*100, message:'ordered success full'})
   
  }
  console.log('post req')
  const cart = new Cart(req.session.cart)
  const amount =cart.totalprice*100;
  console.log(req.body)
  var arr = []
  const Address = req.body.address
  const city =req.body.city
  const state = req.body.state
  const zip = req.body.zip
  // res.send('test')
  stripe.customers.create({
    
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
    
    
  })
  .then(customer => stripe.charges.create({
    amount,
    description: "test",
    currency: 'usd',
    customer: customer.id
  }))
  .then(charge => {
    const orders = new order({
      user:req.user,
      cart:cart,
      name:req.body.name,
      address:[{Address, city,state, zip}],
      
      paymentid: charge.id
      })
      orders.save().then(order=>{
        req.flash('success', 'success fully ordered')
        req.session.cart = null
        console.error('1 content')
        res.render('shop/cart', { total:cart.totalprice,
          stripePublishableKey:'pk_test_ufpAeajoum2pZAEzsHSdsSpJ00mUMcsmGZ'})
      }) 
     })
  })

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.oldurl = req.url;
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/user/login');
}
module.exports = router
