var express = require('express')
var router = express.Router()
var product = require('../model/product')
// var csurf = require('csurf')
const passport = require('passport')

const order = require('../model/order')
const Cart = require('../model/cart')

// const csrufprotection = csurf()
// router.use(csrufprotection)
Object.defineProperty(global, '__line', {
  get: function(){
      return ((new Error()).stack.split("\n")[2].trim().replace(/^(at\s?)(.*)/gim, "$2 >").replace(__dirname, ""))
  }
})

/* GET home page. */
router.get('/', (req, res, next)=>{
    product.find((err, docs)=>{
      var productchunks=[]
      var chunksize = 4
      for(var i = 0; i < docs.length; i+=chunksize){
        productchunks.push(docs.slice(i, i+chunksize))
      }
     return res.render('shop/index', { title: 'Shoping cart', products:productchunks })
    })
  
})

router.get('/profile', (req, res)=>{
return res.render('user/profile')
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
    return res.redirect('/')
  })
})

//shoping cart
router.get('/shop/cart', (req, res, next)=>{
  if(!req.session.cart){

   return res.render('shop/cart', {product:null})

  
  }
  const cart = new Cart(req.session.cart)
  return res.render('shop/cart', {product:cart.generatearray(), totalprice:cart.totalprice}) 
})

//Checkout
router.get('/shop/checkout', (req, res, next)=>{
  if(!req.session.cart){
<<<<<<< HEAD

   return res.render('shop/cart', {product:null})
  }
  const cart = new Cart(req.session.cart)
 return res.render('shop/checkout', { total:cart.totalprice}) 

})
=======
   return res.render('shop/cart', {product:null})
  }
  const cart = new Cart(req.session.cart)
   return res.render('shop/checkout', { total:cart.totalprice}) 
>>>>order>>> 

router.get('/checkout', (req, res, next)=>{
  if(!req.session.cart){
    console.error('no content')
    return res.render('shop/cart', {product:null})
   
  }
  const cart = new Cart(req.token.id)
  var stripe = require('stripe')('sk_test_JbV1bq4Va4JeeMoroTktn4Tq00TKK2RT58');

    // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/cards/collecting/web#create-token
    stripe.charges.create(
      {
        amount: cart.totalprice * 100,
        currency: 'usd',
        source: 'req.body.strip_Tocken',
        description: 'Charge for '+cart.title,
      },
      function(err, charge) {
        if(err){
          req.flash('error', err.message)
          console.error(' content')
          return res.redirect('/checckout')
        }
        
        var orders = new order({
          user:req.user,
          cart:cart,
          name:req.body.name,
          Address:[req.body.add, req.body.city, req.body.state, req.body.zip],
          paymentid: charge.id
        }).save().then(order=>{
          req.flash('success', 'success fully ordered')
          req.session.cart = null
          console.error('1 content')
          return res.redirect ('/')
        })
        .catch(err=>console.log(err))
      }
      
    );
})
module.exports = router
