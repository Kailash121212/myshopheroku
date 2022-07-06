var mongoose= require("mongoose")

const ProductSchema= new mongoose.Schema({
    name:{
        type:String,
        minlength:3
    },
    maincategory:{
        type:String,
        minlength:3
    },
    subcategory:{
        type:String,
        minlength:3
    },
    brand:{
        type:String,
        minlength:3
    },
    baseprice:{
        type:Number,
    },
    discount:{
        type:Number,
        default:0
    },
    finalprice:{
        type:Number,
        default:0
    },
    color:{
        type:String,
    },
    size:{
        type:String,
    }, 
    description:{
        type:String,
    }, 
    pic1:{
        type:String,
    }, 
    pic2:{
        type:String,
    },
    pic3:{
        type:String,
    },
    pic4:{
        type:String,
    },
    stock:{
        type:String,
        minlength:3,
        default:"In Stock"
    }
})
const Product= new mongoose.model("Product", ProductSchema)

module.exports= Product