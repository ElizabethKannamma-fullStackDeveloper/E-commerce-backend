const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    title:String,
    price:String,
    description:String,
    ratings:String,
    images:[
        String
    ],
    category:String,
    brand:String,
    stock:Number,
    numOfReviews:String,
    createdAt:Date
})

module.exports=mongoose.model("Product",productSchema)