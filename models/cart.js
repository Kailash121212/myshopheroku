var mongoose= require("mongoose")

const CartSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    color:{
        type:String,
    },
    size:{
        type:String,
    },
    pic:{
        type:String,
    },
    price:{
        type:Number,
    },
    qty:{
        type:Number,
    },
    total:{
        type:Number,
    }
})
const Cart= new mongoose.model("Cart", CartSchema)

module.exports= Cart