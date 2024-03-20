

const jwt = require("jsonwebtoken");
const userModel = require('../UserModels/UserModel');

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    console.log(token);
    
    if(token){
        jwt.verify(token,"usman secrey key",(err,decodedToken)=>{
            if (err) {
                console.error("JWT verification error:", err.message);
                // Handle invalid token or token expiration error
                res.clearCookie('jwt'); // Clear invalid cookie
                return res.redirect('/login');
            } else {
                console.log("Token decoded:", decodedToken);
                next();
            }
        })
    }else {
        console.error("No JWT token found in cookies");
        res.redirect('/login');
    }
}