const jwt = require("jsonwebtoken")
require("dotenv").config();
const auth = {
    authverify:  (req,res,next)=>{

    try {
        const token =req.cookies.token
        
        console.log(token);
    

    if(!token){
      return   res.status(400).json({message:"unauthorized"})
    }

    const decode = jwt.verify(token ,process.env.jwt_secert)

    
    
    req.userid = decode.id  
    console.log(req.userid);
    

    next();
    } catch (err) {
        return res.status(400).json({message:err.message})
    }    

        
    },
    adminMiddleware : (req, res, next) => {
        try {
          const token = req.cookies.token; // Assuming token is stored in cookies
          if (!token) return res.status(401).json({ message: "Access denied. No token provided." });
      
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
          // Check if user has admin role
          if (!decoded.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
          }
      
          req.user = decoded; // Add user data to request object
          next();
        } catch (error) {
          return res.status(400).json({ message: "Invalid token." });
        }
      }
    
}

module.exports = auth;