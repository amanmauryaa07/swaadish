const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

        const { fullName, email, password } = req.body;

        const isUserExist = await userModel.findOne({ email: email });

        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ 
            userId: user._id,
        },"890298f7a7597eecdde76cb08eda1485dc525ea3cef2fb3dd7305f3367b04c9c")

        res.cookie("token", token)

        res.status(201).json({ 
            message: "User registered successfully", 
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
         })

}

async function loginUser(req, res) {}

module.exports = {
    registerUser,
    loginUser
}