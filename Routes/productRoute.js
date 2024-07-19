const express=require("express")
const router=express.Router()
const ProductModel=require("../Models/ProductModel")



//GET /products/

router.get("/",async(req,res)=>{
    const query=req.query.keyword?{
        title:{
            $regex:req.query.keyword,
            $options:"i"
        }
    }:{}
    const products=await ProductModel.find(query)
    res.json({
        success:true,
        products})
})


//GET /products/:id
router.get("/:id",async(req,res)=>{
    console.log(req.params.id)
    try{
        const product=await ProductModel.findById(req.params.id)
        res.json({
            success:true,
            product})
    }
    catch(error){
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
    
})


module.exports=router;