const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


//POST 
router.post("/process", async (req, res) => {
    try {
        const paymentIntend = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency:"usd",
            description: "TEST PAYMENT",
            metadata: { integration_check: "accept_payment" },

        })
        res.status(200).json({
            success: true,
            client_secret: paymentIntend.client_secret
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }

})


router.get("/stripeApi", async (req, res) => {
    try {
        res.status(200).json({
            stripeApiKey:process.env.STRIPE_API_KEY
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
})

module.exports=router;