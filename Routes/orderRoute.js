const express = require("express")
const router = express.Router()
const OrderModel = require("../Models/orderModel")
const ProductModel=require("../Models/ProductModel")


//POST /orders/

router.post("/", async (req, res) => {
    const cartItems = req.body;
    // console.log(cartItems);
    const amount = cartItems.reduce((acc, item) => {
        acc = acc + item.product.price * item.qty
        return acc
    }, 0);
    // console.log(amount);
    const status = "pending"
    try {
        const order = new OrderModel({
            cartItems,
            amount,
            status
        })
        await order.save();
        //updating product stocks
        cartItems.forEach(async(item) => {
            const product= await ProductModel.findById(item.product._id);
            product.stock=product.stock-item.qty;
            await product.save()
        });
        res.json({
            success: true,
            order
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }

})

module.exports = router;
