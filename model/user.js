const mongoose = require("mongoose")
const Schema = mongoose.Schema


const schema = new Schema({
    name:{type:String,
         required:true,
          trim:true},
    email:{type:String,
         required:true,
          lowercase:true,
           trim:true},
    password:{type:String,
        required:true,
        trim:true},
    date:{type:Date,
        default:Date.now,
        },           
})

// schema.methods.encryptpassword = ()=>{
//     return bycript.hashSync(password, bycript.genSaltSync(5),null)
// }
// schema.methods.validpassword = ()=>{
//     return bycript.compareSync(password, this.password)
// }
module.exports =mongoose.model('user', schema)
