const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const schema = new Schema({
   user :{type:Schema.Types.ObjectId , ref:'user'},
   cart :{type:Object, required:true},
   name :{type:String, required:true},
   address :{type:String, required:true},
   paymentid : {type: String}
})



module.exports = mongoose.model('order',schema)