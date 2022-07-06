var mongoose= require("mongoose")

const ContactUsSchema= new mongoose.Schema({
    name:{
        type:String,
        minlength:3
    },
    email:{
        type:String,
        minlength:13
    },
    phone:{
        type:String,
        minlength:10
    },
    subject:{
        type:String,
    },
    message:{
        type:String,
    },
    status:{
        type:String,
        default:"Active"
    }
})


const ContactUs= new mongoose.model("ContactUs", ContactUsSchema)

module.exports= ContactUs