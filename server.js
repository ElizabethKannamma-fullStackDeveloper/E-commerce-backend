const express = require("express");
const dotenv = require("dotenv")
const connectDB=require("./DB")
const app = express();
const cors=require("cors")
dotenv.config();
connectDB();

const productsRoute=require("./Routes/productRoute")
const ordersRoute=require("./Routes/orderRoute")
const userRoute=require("./Routes/userRoute")
const paymentRoute=require("./Routes/paymentRoute")

app.use(express.json())
app.use(cors());
app.use("/products",productsRoute)
app.use("/orders",ordersRoute)
app.use("/auth",userRoute)
app.use("/payment",paymentRoute)

app.listen(process.env.PORT, () => { console.log(`Server running on port ${process.env.PORT}`) })