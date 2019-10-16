const product = require("../model/product")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/shoping", {useNewUrlParser:true, useUnifiedTopology: true, useUnifiedTopology: true })


const products = [new product({
    imgpath:"https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjYwsyL4pnlAhXDTX0KHbGpBQ0QjRx6BAgBEAQ&url=https%3A%2F%2Ftwitter.com%2Fhashtag%2Fsheos&psig=AOvVaw0CNZF4mQFvj5JcdBPqcnyc&ust=1571074316197615",
    title:"Nike Airforce",
    description:"afdsvsdvsfvsfvsfsvfsvfvfvff",
    price:12
 }),new product({
    imgpath:"https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjYwsyL4pnlAhXDTX0KHbGpBQ0QjRx6BAgBEAQ&url=https%3A%2F%2Ftwitter.com%2Fhashtag%2Fsheos&psig=AOvVaw0CNZF4mQFvj5JcdBPqcnyc&ust=1571074316197615",
    title:"Nike Airforce",
    description:"afdsvsdvsfvsfvs sadsvsvsf fsvfsvfvfvff",
    price:12

}),new product({
    imgpath:"https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjYwsyL4pnlAhXDTX0KHbGpBQ0QjRx6BAgBEAQ&url=https%3A%2F%2Ftwitter.com%2Fhashtag%2Fsheos&psig=AOvVaw0CNZF4mQFvj5JcdBPqcnyc&ust=1571074316197615",
    title:"Nike Airforce",
    description:"afdsvsdvsfvsfvs sadsvsvsf fsvfsvfvfvff",
    price:12

}),new product({
    imgpath:"https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjYwsyL4pnlAhXDTX0KHbGpBQ0QjRx6BAgBEAQ&url=https%3A%2F%2Ftwitter.com%2Fhashtag%2Fsheos&psig=AOvVaw0CNZF4mQFvj5JcdBPqcnyc&ust=1571074316197615",
    title:"Nike Airforce",
    description:"afdsvsdvsfvsfvs sadsvsvsf fsvfsvfvfvff",
    price:12

}),new product({
    imgpath:"https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjYwsyL4pnlAhXDTX0KHbGpBQ0QjRx6BAgBEAQ&url=https%3A%2F%2Ftwitter.com%2Fhashtag%2Fsheos&psig=AOvVaw0CNZF4mQFvj5JcdBPqcnyc&ust=1571074316197615",
    title:"Nike Airforce",
    description:"afdsvsdvsfvsfvs sadsvsvsf fsvfsvfvfvff",
    price:12

}),new product({
    imgpath:"https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjYwsyL4pnlAhXDTX0KHbGpBQ0QjRx6BAgBEAQ&url=https%3A%2F%2Ftwitter.com%2Fhashtag%2Fsheos&psig=AOvVaw0CNZF4mQFvj5JcdBPqcnyc&ust=1571074316197615",
    title:"Nike Airforce",
    description:"afdsvsdvsfvsfvs sadsvsvsf fsvfsvfvfvff",
    price:12

})]
var done = 0
    for(var i=0; i < products.length; i++){
    products[i].save((error, result)=>{
    done++
    if (done === products.length){
        exit()
    }
})}
function exit(){
    mongoose.disconnect()
}
