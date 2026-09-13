const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function register(req, res) {
    const {username , email , password} = req.body;


    if(!email || !username || !password){
        res.status(400).json({
            message: "User response needed"
        })
    }


    try {

        const userExist = await userModel.findOne({email: email});

    if(userExist){
        return res.status(400).json({
            message : "User already exist"
        })
    }

        const hashPass = await bcrypt.hash(password , 10);

      const user =   await userModel.create({
            username: username,
            email: email,
            password: hashPass
        })

        const token = jwt.sign( {email : user.email }, process.env.SECRET_KEY);

        return res.cookie("token", token,{
        httpOnly: true,           // JS can't access it — blocks XSS token theft
        secure: process.env.NODE_ENV === "production", // HTTPS only in prod
        sameSite: "strict",       // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days, matches your JWT expiry
    }).status(201).json({
            message: "User created succesfully",
            user: {
                id : user._id,
                email: user.email,
                username: user.username
            }
            
        })
    } catch (error) {
        return res.status(500).json({
            message: " User creation failed"
        })
    }
    
}


async function login(req, res) {
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "All fields required"
        })
    }

    try {
        const user = await userModel.findOne({email : email});

        if(!user){
            return res.status(400).json({
                message : "User don't exist"
            })
        }

        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch){
            return res.status(400).json({
                message : "Wrong password"
            })
        }

        const token = jwt.sign({id : user._id} , process.env.SECRET_KEY)

        return res.cookie("token" , token , {
        httpOnly: true,           // JS can't access it — blocks XSS token theft
        secure: process.env.NODE_ENV === "production", // HTTPS only in prod
        sameSite: "strict",       // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days, matches your JWT expiry
    }).status(201).json({
            message : "User login successfully",
            user
        })


    } catch (error) {
        return res.status(500).json({
            message : "Login failed",
            error
        })
    }
    
}

async function getMe(req, res) {
    return res.status(200).json({ user: req.user });
}

async function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout successful" });
}

module.exports = { register, login, getMe, logout };   // make sure all functions are exported

