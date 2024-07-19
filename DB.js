const mongoose = require("mongoose");
const connectDB = async (req, res) => {
    await mongoose.connect(process.env.DB_HOST,
        { useNewUrlParser: true, useUnifiedTopology: true })

    console.log("MongoDB connected.........");
}

module.exports = connectDB;