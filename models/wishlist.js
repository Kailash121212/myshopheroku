var mongoose= require("mongoose")

const WishlistSchema= new mongoose.Schema({
    userid:{
        type:String,
    },
    productid:{
        type:String,
    },
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
    }

})
const Wishlist= new mongoose.model("Wishlist", WishlistSchema)

module.exports= Wishlist