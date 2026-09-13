const jwt = require('jsonwebtoken')

async function authMiddleware(req ,res , next) {
    

    const token = req.cookies.token ; 

    try {
        if(!token){
        return res.status(401).json({
            message: "No token"
        })
    }

    const decode = jwt.verify( token , process.env.SECRET_KEY )
    req.user = decode
    


    next();
    } catch (error) {
        return res.status(401).json({
            message: 'user verification failed'
        })
    }
}


module.exports = authMiddleware