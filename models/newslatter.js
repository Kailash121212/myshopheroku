var mongoose= require("mongoose")

const NewslatterSchema= new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        minlength:13
    }
})
const Newslatter= new mongoose.model("Newslatter", NewslatterSchema)

module.exports= Newslatter