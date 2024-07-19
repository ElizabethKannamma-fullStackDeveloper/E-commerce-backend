const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const router = express.Router();


//POST/auth/register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "user already exists" });
        }
        user = new User({
            name,
            email,
            password
        });
        await user.save();
        res.status(200).json({ msg: "user registered successfully" })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");

    }
});

//POST /auth/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "invalid password" });
        }
        const payload = {
            user: {
                id: user._id
            }
        };
        jwt.sign(payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");

    }
});

//GET/auth/logout

router.get("/logout", (req, res) => {
    res.json({ msg: "user logged out successfuly" })
});

module.exports = router;
