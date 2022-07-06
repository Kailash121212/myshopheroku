var mongoose= require("mongoose")

const MaincategorySchema= new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        minlength:3
    }
})
const Maincategory= new mongoose.model("maincategory", MaincategorySchema)

module.exports= Maincategory