var mongoose= require("mongoose")
// mongoose.connect("mongodb://localhost:27017/myshop")
// mongoose.connect("mongodb+srv://Kailash:KailashSingh@cluster0.flghh.mongodb.net/myshop?retryWrites=true&w=majority")
mongoose.connect(process.env.DBKEY)
.then(()=>console.log("Database is Connected"))
.catch((error)=>console.log(error)) 