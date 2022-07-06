var mongoose= require("mongoose")

const SubcategorySchema= new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        minlength:3
    }
})
const Subcategory= new mongoose.model("subcategory", SubcategorySchema)

module.exports= Subcategory