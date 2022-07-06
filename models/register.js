var mongoose= require("mongoose")

const RegisterSchema= new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        minlength:3
    },
    username:{
        type:String,
        uppercase:true,
        unique:true,
        minlength:3
    },
    email:{
        type:String,
        // unique:true,
        minlength:13
    },
    phone:{
        type:String,
        minlength:10
    },
    addressline1:{
        type:String,
        lowercase:true
    },
    addressline2:{
        type:String,
        lowercase:true
    },
    addressline3:{
        type:String,
        lowercase:true
    },
    pin:{ 
        type:String
    },
    city:{
        type:String,
        lowercase:true
    },
    state:{
        type:String,
        uppercase:true
    },
    pic:{
        type:String,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default:"User"
    },
    token:[
        {
            type:String
        }
    ]
    
})
const Register= new mongoose.model("Register", RegisterSchema)

module.exports = Register