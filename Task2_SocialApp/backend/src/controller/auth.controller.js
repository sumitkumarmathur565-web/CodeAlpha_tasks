const User = require('../model/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function register(req, res) {

    const {username , email , password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message : "All field Required"
        })
    }


    try {
        const existUser = await User.findOne({email: email});

        if( existUser){
            return res.status(400).json({
                message:"User already exist"
            })
        }

        const hashPass = await bcrypt.hash(password , 10);

        const user = await User.create({
            username : username,
            email :email,
            password : hashPass
        })

        const token = jwt.sign({email: email} , process.env.SECRET_KEY , {expiresIn : '7d'});

        return res.cookie("token" , token).status(201).json({
            message: "User created",
            user :{
                username , email
            }
        })
        





    } catch (error) {
        return res.status(500).json({
            message : "register failed",
            error
            
        });

        

        
    }
    
}

async function login(req, res) {
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message :" User input needed"
        })
    }

    try {
        const user = await User.findOne({email: email});

        if(!user){
            return res.status(400).json({
                message: "User don't exist"
            })
        }


        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch){
            return res.status(400).json({
                message : "Password is wrong"
            })
        }

        const token = jwt.sign({email: user.email} , process.env.SECRET_KEY , {expiresIn: '7d'});

        return res.cookie("token" , token).status(200).json({
            message: "Login complete",
            user:{
               id: user._id,
               username: user.username,
               email: user.email
            }
        })


    } catch (error) {
        return res.status(500).json({
            message:"Login failed",
            error
        })
    }
    
}

async function getMe(req ,res) {
    const fetch = req.user;

    const user = await User.findOne({email: fetch.email}).populate('username' , 'email');

    return res.status(200).json({
        message: "User fetched",
        user:{
            id: user._id,
            email: user.email,
            username: user.username,
            followers: user.followers,
            following: user.following
        
        }
        
       
    })

    
    
}

async function logout(req,res) {

    try {
         res.clearCookie("token");
         return res.status(200).json({
            message : "Logout done"
         })
    } catch (error) {
        console.log(error);
        return re.status(500).json({
            message : "Logout failed"
        })
    }
    
}

module.exports = { register , login , getMe , logout}