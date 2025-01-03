const asyncHandler = require("express-async-handler");

const registerRoute = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all fields");
    }
    res.send("Register a user");
})

const loginRoute = asyncHandler( async (req, res) => {
    res.send("Login a user");
})

module.exports = {
    registerRoute,
    loginRoute,
}
