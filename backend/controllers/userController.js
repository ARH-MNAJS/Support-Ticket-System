const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const registerRoute = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all fields");
    }

    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data");
    }
})

const loginRoute = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
        })
    } else {
        res.status(401)
        throw new Error("Invalid Credentials");
    }
})

const getMe = asyncHandler( async (req, res) => {
    res.send('me')
})

module.exports = {
    registerRoute,
    loginRoute,
    getMe
}
