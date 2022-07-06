const dotenv = require("dotenv")
var express = require("express")
const multer = require("multer")
var fs = require("fs")
const Razorpay = require("razorpay");
var crypto = require("crypto")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const Maincategory = require("./models/maincategory")
const Subcategory = require("./models/subcategory")
const Brand = require("./models/brand")
const Product = require("./models/product")
const Register = require("./models/register")
const Cart = require("./models/cart")
const Wishlist = require("./models/wishlist")
const Checkout = require("./models/checkout.js")
const Newslatter = require("./models/newslatter")
const ContactUs = require("./models/contactus")
const cors = require("cors")
var nodemailer = require("nodemailer")
var from = "kamalpanday108@gmail.com"
var PORT= process.env.PORT || 8000

var transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:from,
        pass:"nvhshohnalellscd"
    }
}) 

dotenv.config();
require("./db_connect")

var url = "http://localhost:3000"
var app = express()
app.use(cors())
app.use("/public", express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '1024mb' }));
app.use(express.urlencoded({ limit: '1024mb' }));


// app.get("/", (req, res) => {
//     res.send("Hello From Server")
// })


function varifyToken(req,res,next){
    let token = req.headers['authorization']
    let username = req.headers['username']
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,async(error,data)=>{
            if(error){
                console.log(error);
                res.send({"result":"Fail",message:"Auth Token Verification Fail"})
            }
            else
            {
                var user = await Register.findOne({username:username})
                if(user.token.findIndex((item=>item==token))!=-1)
                next()
                else
                res.send({"result":"Fail",message:"You Logged out from All Device\nLogin Again"}) 
            }
        })
    }
    else{
        res.send({"result":"Fail"})
    }
}
app.post("/orders",varifyToken,varifyToken, async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

app.put("/verify",varifyToken, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");
        console.log(req.body,expectedSign);
        if (razorpay_signature === expectedSign) {
            var check = await Checkout.findOne({ _id: req.body.checkid })
            console.log(check);
            check.rppid = razorpay_payment_id
            check.paymentstatus = "Done"
            let result = await check.save()
            res.status(200).send({ message: "Done" });
        } else {
            res.status(400).send({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

//API for Search Products
app.post("/search",async(req,res)=>{
    try{
        var products =await Product.find({$or:[
                        {name:  { $regex: '.*' + req.body.q + '.*' }},
                        {maincategory: { $regex: '.*' + req.body.q + '.*' }},
                        {subcategory: { $regex: '.*' + req.body.q + '.*' }},
                        {brand: { $regex: '.*' + req.body.q + '.*' }},
                        {color: { $regex: '.*' + req.body.q + '.*' }},
                        {size: { $regex: '.*' + req.body.q + '.*' }},
                        {description: { $regex: '.*' + req.body.q + '.*' }}
                    ]});
        res.send({message:"Done",data:products})
    }
    catch(error){
        res.send({message:error})
    }
})


//API for Search Product
app.post("/search" ,async (req,res)=>{
    try{
        var products= Product.find({$or:[
            {name:req.body.q},
            {maincategory:req.body.q},
            {subcategory:req.body.q},
            {brand:req.body.q},
            {color:req.body.q},
            {size:req.body.q},
            {discount:req.body.q},
            {finalprice:req.body.q},
            {description:req.body.q}
        ]});
        res.send({message:"Done",data:products})
    }
    catch(error){
        res.send({message:error})
    }
})

//APIs for MainCategory
app.post("/maincategory",varifyToken, async (req, res) => {
    try {
        var maincategory = await new Maincategory(req.body)
        await maincategory.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: "Main Category is Already Exist" })
    }
})
app.get("/maincategory", async (req, res) => {
    try {
        var data = await Maincategory.find()
        res.send(data)
    }
    catch (error) {
        res.send({ message: "Fail" })
    }
})
app.get("/maincategory/:_id", async (req, res) => {
    try {
        var data = await Maincategory.findOne({ _id: req.params._id })
        res.send(data)
    }
    catch (error) {
        res.send({ message: "Fail" })
    }
})
app.delete("/maincategory/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Maincategory.deleteOne({ _id: req.params._id })
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.put("/maincategory/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Maincategory.findOne({ _id: req.params._id })
        data.name = req.body.name
        var result = await data.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: "Main Category is Already Exist" })
    }
})

//APIs for SubCategory
app.post("/subcategory",varifyToken, async (req, res) => {
    try {
        var subcategory = await new Subcategory(req.body)
        await subcategory.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: "Sub Category is Already Exist" })
    }
})
app.get("/subcategory", async (req, res) => {
    try {
        var data = await Subcategory.find()
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.get("/subcategory/:_id", async (req, res) => {
    try {
        var data = await Subcategory.findOne({ _id: req.params._id })
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.delete("/subcategory/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Subcategory.deleteOne({ _id: req.params._id })
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.put("/subcategory/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Subcategory.findOne({ _id: req.params._id })
        data.name = req.body.name
        var result = await data.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: "Sub Category is Already Exist" })
    }
})
//APIs for Brand
app.post("/brand",varifyToken, async (req, res) => {
    try {
        var brand = await new Brand(req.body)
        await brand.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: "Brand is Already Exist" })
    }
})
app.get("/brand", async (req, res) => {
    try {
        var data = await Brand.find()
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.get("/brand/:_id", async (req, res) => {
    try {
        var data = await Brand.findOne({ _id: req.params._id })
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.delete("/brand/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Brand.deleteOne({ _id: req.params._id })
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.put("/brand/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Brand.findOne({ _id: req.params._id })
        data.name = req.body.name
        var result = await data.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: "Brand is Already Exist" })
    }
})

//API for Products
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/media/images")
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname)
    }
})
var upload = multer({ storage: storage })
app.post("/product", upload.fields(
    [
        { name: "pic1", maxCount: 1 },
        { name: "pic2", maxCount: 1 },
        { name: "pic3", maxCount: 1 },
        { name: "pic4", maxCount: 1 },
    ]
),varifyToken, async (req, res) => {
    try {

        var pic1 = req.files.pic1[0].filename
        var pic2 = req.files.pic2[0].filename
        var pic3 = req.files.pic3[0].filename
        var pic4 = req.files.pic4[0].filename
        var bp = req.body.baseprice
        var d = req.body.discount
        var fp = bp - bp * d / 100
        var product = new Product({
            name: req.body.name,
            maincategory: req.body.maincategory,
            subcategory: req.body.subcategory,
            brand: req.body.brand,
            baseprice: bp,
            discount: d,
            finalprice: fp,
            color: req.body.color,
            size: req.body.size,
            description: req.body.description,
            stock: req.body.stock,
            pic1: pic1,
            pic2: pic2,
            pic3: pic3,
            pic4: pic4,
        })
        let result = await product.save()
        var newslatters = await Newslatter.find()
        for(let item of newslatters){
            var mailOptions= {
                from:from,
                to:item.email,
                subject:`Checkout our Latest Products :Team - Myshop`,
                text:`
                    Checkout our Latest Products!!!
                    Shop Now to get great Discount and checkout our products
                    Team : Myshop
                    ${url}
                    `
            }
            transporter.sendMail(mailOptions,(error,data)=>{
            })
        }
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.get("/product", async (req, res) => {
    try {
        var data = await Product.find()
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.get("/product/:_id", async (req, res) => {
    try {
        var data = await Product.findOne({ _id: req.params._id })
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.delete("/product/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Product.deleteOne({ _id: req.params._id })
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.put("/product/:_id",varifyToken, upload.fields(
    [
        { name: "pic1", maxCount: 1 },
        { name: "pic2", maxCount: 1 },
        { name: "pic3", maxCount: 1 },
        { name: "pic4", maxCount: 1 },
    ]), async (req, res) => {
        try {
            let product = await Product.findOne({ _id: req.params._id })
            product.name = req.body.name
            product.maincategory = req.body.maincategory
            product.subcategory = req.body.subcategory
            product.brand = req.body.brand
            product.baseprice = req.body.baseprice
            product.discount = req.body.discount
            product.finalprice = product.baseprice - product.baseprice * product.discount / 100
            product.color = req.body.color
            product.size = req.body.size
            product.description = req.body.description
            try {
                try{
                    fs.unlinkSync("./public/media/images/" + product.pic1)
                }
                catch{}
                var pic1 = req.files.pic1[0].filename
            }
            catch {
                var pic1 = product.pic1
            }
            try {
                try{
                    fs.unlinkSync("./public/media/images/" + product.pic2)
                }
                catch{}
                var pic2 = req.files.pic2[0].filename
            }
            catch {
                var pic2 = product.pic2
            }
            try {
                try{
                    fs.unlinkSync("./public/media/images/" + product.pic3)
                }
                catch{}
                var pic3 = req.files.pic3[0].filename
            }
            catch {
                var pic3 = product.pic3
            }
            try {
                try{
                    fs.unlinkSync("./public/media/images/" + product.pic4)
                }
                catch{}
                var pic4 = req.files.pic4[0].filename
            }
            catch {
                var pic4 = product.pic4
            }
            product.pic1 = pic1
            product.pic2 = pic2
            product.pic3 = pic3
            product.pic4 = pic4
            let result = await product.save()
            res.send({ message: "Done" })
        }
        catch (error) {
            res.send({ message: error })
        }
    })
//API for Login
app.post("/login", async (req, res) => {
    try {
        var user = await Register.findOne({ username: req.body.username })
        if (await bcrypt.compare(req.body.password,user.password))
            jwt.sign({user},process.env.SECRET_KEY,async(error,data)=>{
                if(error)
                console.log({message:"Invalid JWT Token"});
                else
                {
                    if(user.token.length<5)
                    {
                        user.token.push(data)
                        await user.save()
                        res.send({message:"Done",user:user,token:data})
                    }
                    else
                    res.send({message:"You Are Already Loggedin From 5 Device"})
                }
            })
        else
            res.send({ message: "Invalid UserName or Password" })
    }
    catch {
        res.send({ message: "Invalid UserName or Password" })
    }
})
app.post("/logout", async (req, res) => {
     try {
        var user = await Register.findOne({ username: req.body.username })
        var index = user.token.findIndex((item)=>item==req.body.token)
        user.token.splice(index,1)
        await user.save()
        res.send({message:"Done"})
    }
    catch {
        res.send({ message: "Something Went Wrong" })
    }
})
app.post("/logoutall", async (req, res) => {
    try {
       var user = await Register.findOne({ username: req.body.username })
       var index = user.token.findIndex((item)=>item==req.body.token)
       user.token=[]
       await user.save()
       res.send({message:"Done"})
   }
   catch {
       res.send({ message: "Something Went Wrong" })
   }
})
//APIs for User Registration
app.post("/register", async (req, res) => {
     try {
        const pass = await bcrypt.hash(req.body.password,12)
        var register = await new Register({
            name: req.body.name,
            username: req.body.username,
            phone: req.body.phone,
            email: req.body.email,
            password: pass,
            addressline1: "",
            addressline2: "",
            addressine3: "",
            pin: "",
            city: "",
            state: "",
            pic: "",
        })
        await register.save()
        var mailOptions= {
            from:from,
            to:req.body.email,
            subject:`Thanks to Create an Account With Us :Team - Myshop`,
            text:`
                Thanks to Create an Account With Us!!!
                Shop Now to get great Discount and checkout our products
                Team : Myshop
                ${url}
                `
        }
        transporter.sendMail(mailOptions,(error,data)=>{
            if(error){
                console.log(error);
            }
        })
        res.send({ message: "Done" })
   }
    catch (error) {
        try {
            if (error.keyValue.name)
                res.send({ message: "Name is Already Taken" })
            else if (error.keyValue.username)
                res.send({ message: "User Name is Already Taken" })
            else if (error.keyValue.email)
                res.send({ message: "Email id is Already Registered or Email Id is not Valid" })
        }
        catch {
            res.send({ message: "Phone Number is Not Valid" })
        }
    }
})
app.get("/register",varifyToken, async (req, res) => {
    try {
        var data = await Register.find()
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.get("/register/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Register.findOne({ _id: req.params._id })
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.delete("/register/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Register.deleteOne({ _id: req.params._id })
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.put("/register/:_id", upload.fields(
    [
        { name: "pic", maxCount: 1 }
    ]),varifyToken, async (req, res) => {
        try {
            var data = await Register.findOne({ _id: req.params._id })
            try {
                var pic = req.files.pic[0].filename
            }
            catch {
                var pic = data.pic
            }
            data.name = req.body.name
            data.email = req.body.email
            data.phone = req.body.phone
            data.addressline1 = req.body.addressline1
            data.addressline2 = req.body.addressline2
            data.addressline3 = req.body.addressline3
            data.pin = req.body.pin
            data.city = req.body.city
            data.state = req.body.state
            data.pic = pic
            var result = await data.save()
            res.send({ message: "Done" })
        }
        catch (error) {
            try {
                if (error.keyValue.name)
                    res.send({ message: "Name is Already Taken" })
                else if (error.keyValue.username)
                    res.send({ message: "User Name is Already Taken" })
                else if (error.keyValue.email)
                    res.send({ message: "Email id is Already Registered or Email Id is not Valid" })
            }
            catch {
                res.send({ message: "Phone Number is Not Valid" })
            }
            try {
                if (error.keyValue.name)
                    res.send({ message: "Name is Already Taken" })
                else if (error.keyValue.username)
                    res.send({ message: "User Name is Already Taken" })
                else if (error.keyValue.email)
                    res.send({ message: "Email id is Already Registered or Email Id is not Valid" })
            }
            catch {
                res.send({ message: "Phone Number is Not Valid" })
            }
        }
    })
//API for Cart
app.post("/cart",varifyToken, async (req, res) => {
    try {
        var cart = await new Cart(req.body)
        await cart.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.get("/cart/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Cart.find({ userid: req.params._id })
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.delete("/cart/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Cart.deleteOne({ _id: req.params._id })
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.delete("/cart/all/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Cart.deleteMany({ userid: req.params._id })
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.put("/cart/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Cart.findOne({ _id: req.params._id })
        data.qty = req.body.qty
        data.total = req.body.total
        var result = await data.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
//APIs for Wishlist
app.post("/wishlist",varifyToken, async (req, res) => {
    try {
        var wishlist = await new Wishlist(req.body)
        await wishlist.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.get("/wishlist/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Wishlist.find({ userid: req.params._id })
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.delete("/wishlist/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Wishlist.deleteOne({ _id: req.params._id })
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})

//API for checkout
app.post("/checkout",varifyToken, async (req, res) => {
    try {
        var checkout = await new Checkout(req.body)
        var user = await Register.findOne({_id:req.body.userid})
        await checkout.save()
        var mailOptions= {
            from:from,
            to:user.email,
            subject:`Thanks to Shop With Us :Team - Myshop`,
            text:`
                Thanks to Shop With Us!!!
                Shop More to get great Discount and checkout our products
                Team : Myshop
                ${url}
                `
        }
        transporter.sendMail(mailOptions,(error,data)=>{
        })
        res.send({ message: "Done" })
    }
    catch (error) {
        console.log(error);
        res.send({ message: "Something Went Wrong" })
    }
})
app.get("/checkout",varifyToken, async (req, res) => {
    try {
        var data = await Checkout.find()
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.get("/checkout/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Checkout.find({ userid: req.params._id })
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.get("/checkout/single/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Checkout.findOne({ _id: req.params._id })
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.put("/checkout/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Checkout.findOne({ _id: req.params._id })
        if (req.body.rppid)
            data.rppid = req.body.rppid
        if (req.body.status)
            data.status = req.body.status
        if (req.body.paymentstatus)
            data.paymentstatus = req.body.paymentstatus
        var result = await data.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.delete("/checkout/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Checkout.deleteOne({ _id: req.params._id })
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
//API for Newslatter
app.post("/newslatter", async (req, res) => {
    try {
        var newslatter = await new Newslatter(req.body)
        await newslatter.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: "Email Id is Already Registered" })
    }
})
app.get("/newslatter",varifyToken, async (req, res) => {
    try {
        var data = await Newslatter.find()
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.delete("/newslatter/:_id",varifyToken, async (req, res) => {
    try {
        var data = await Newslatter.deleteOne({ _id: req.params._id })
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
//API for Contact US
app.post("/contact", async (req, res) => {
    try {
        var conatct = await new ContactUs(req.body)
        await conatct.save()
        var mailOptions= {
            from:from,
            to:req.body.email,
            subject:`Thanks to Contact US :Team - Myshop`,
            text:`
                Thanks to Contact US!!!! Our Team Will Contact You Soon!!!
                Team : Myshop
                ${url}
                `
        }
        transporter.sendMail(mailOptions,(error,data)=>{})
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.get("/contact/:_id",varifyToken, async (req, res) => {
    try {
        var data = await ContactUs.findOne({ _id: req.params._id })
        res.send(data)
    }
    catch (error) {
        res.send({ message: "Fail" })
    }
})
app.get("/contact",varifyToken, async (req, res) => {
    try {
        var data = await ContactUs.find()
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.delete("/contact/:_id",varifyToken, async (req, res) => {
    try {
        var data = await ContactUs.deleteOne({ _id: req.params._id })
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})
app.put("/contact/:_id",varifyToken, async (req, res) => {
    try {
        var data = await ContactUs.findOne({ _id: req.params._id })
        data.status = req.body.status
        var result = await data.save()
        res.send({ message: "Done" })
    }
    catch (error) {
        res.send({ message: error })
    }
})

//API for Reset Password
app.get("/forget-password-username/:username",async(req,res)=>{
    try{
        var user =await Register.findOne({username:req.params.username})
        var num = parseInt(Math.random()*1000000)
        var mailOptions= {
            from:from,
            to:user.email,
            subject:`OTP to Password Reset :Team - Myshop`,
            text:`
                OTP for Password Rest is ${num}!!!
                Team : Myshop
                ${url}
                `
        }
        transporter.sendMail(mailOptions,(error,data)=>{
        })
        res.send({"message":"Done","OTP":num})
    }
    catch(error){
        res.send({message:error})
    }
})
app.post("/forget-password-reset",async(req,res)=>{
    try{
        var user = await Register.findOne({username:req.body.username})
        const pass = await bcrypt.hash(req.body.password,12)
        user.password=pass
        await user.save()
        var mailOptions= {
            from:from,
            to:register.email,
            subject:`your Password Has been Reset :Team - Myshop`,
            text:`
                your Password Has been Reset!!!
                Shop Now to get great Discount and checkout our products
                Team : Myshop
                ${url}
                `
        }
        transporter.sendMail(mailOptions,(error,data)=>{
        })
        res.send({"message":"Done"})
    }
    catch(error){
        console.log(error);
        res.send({message:"Fail"})
    }
})


if(process.env.NODE_ENV=="production"){
    app.use(express.static("myshop/build"))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"myshop","build","index.html"))
    })
}

app.listen(PORT, () => {
    console.log("server is Running")
})









