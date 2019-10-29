var express = require('express');
var router = new express.Router();
const passport = require('passport')
const keys = require('../config/keys');
const stripe = require('stripe')('sk_test_JbV1bq4Va4JeeMoroTktn4Tq00TKK2RT58');


const order = require('../model/order')
const Cart = require('../model/cart')

// //shoping cart
// router.get('/cart', (req, res, next)=>{
//     if(!req.session.cart){
  
//      return res.render('shop/cart', {product:null})
  
//     }
//     const cart = new Cart(req.session.cart)
//     res.render('shop/cart', {product:cart.generatearray(), totalprice:cart.totalprice, stripePublishableKey: 'pk_test_ufpAeajoum2pZAEzsHSdsSpJ00mUMcsmGZ'}) 
//   })
  
//   //Checkout
// router.get('/checkout', (req, res, next)=>{
//     if(!req.session.cart){
//       return res.render('shop/cart', {product:null})
//      } 
//      console.log('bad')
//      const cart = new Cart(req.session.cart)
//      res.render('shop/checkout', { total:cart.totalprice}) 
//      })
  
//   //checkout handle
// router.post('/checkout', (req, res, next)=>{
//       if(!req.session.cart){
//       console.error('no content')
//       return res.render('shop/cart', {product:null})
     
//     }

//     console.log('post req')
//     const cart = new Cart(req.session.cart)
//     const amount = cart.totalprice;
    
//     console.log(req.body)
//     stripe.customers.create({
//       email: req.body.stripeEmail,
//       source: req.body.stripeToken
     
//     })
//     .then(customer => stripe.charges.create({
//       amount,
//       description: 'Web Development Ebook',
//       currency: 'usd',
//       customer: customer.id
//     }))
//     .then(charge => res.render('/shop/cart', { total:cart.totalprice, stripePublishableKey: keys.stripePublishableKey}) );
//   });

    
  

  
  module.exports = router;