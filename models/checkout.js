var mongoose= require("mongoose")

const CheckoutSchema= new mongoose.Schema({
    userid:{
        type:String,  
    },
    total:{
        type:Number,
    },
    shipping:{
        type:Number,
    },
    final:{
        type:Number
    },
    mode:{
        type:String,
        default:"COD"
    },
    status:{
        type:String,
        default:"Not Packed"
    },
    paymentstatus:{
        type:String,
        default:"pending"
    }, 
    rppid:{
        type:String,
    }, 
    products:[{
        productid:{
            type:String
        },
        name:{
            type:String,
            
        },
        price:{
            type:Number,
            default:0
        },
        color:{
            type:String
        },
        size:{
            type:String
        }, 
        pic:{
            type:String
        },
        qty:{
            type:String
        },
        total:{
            type:Number
        }
    }
    ]
})
const checkout= new mongoose.model("checkout", CheckoutSchema)

module.exports= checkout