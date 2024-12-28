const mongoose =require("mongoose")
const user = require('../model/usermodel')
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken");
const app = require('../app')
require("dotenv").config();
const validat = require("validator")
const nodemailer =require('nodemailer')



const logincontroller = {
    register : async (req,res)=>{
         try {
            console.log("register login");
            console.log(req.body);
            
           const { username , email,password} = req.body

           const verifyemail = await user.findOne({email: email}) 
            console.log(verifyemail);
            
           if(verifyemail){
            return res.status(400).json({message:"user already there"})
           }

      const hashpassword = await  bcrypt.hash(password , 10)
           const newuser =  new user ({
            username ,  email, password : hashpassword
           })
           console.log(newuser);
           
           await newuser.save()

          return  res.status(200).json({mesage:"user created successfully"})
            
            
         } catch (err) {
            res.status(400).json({err:err.meaasge})
         }
    },
    






    admin : async(req,res)=>{
        try {
           
            
             const alldata =await user.find()
            
             
          res.status(200).json(alldata)
               
        } catch (error) {
            res.status(400).json({meaasge:error.message})
            
        }
        
    },
    
    login : async (req,res)=>{

        try {
            console.log("login");

            const {email ,password} = req.body
    
        const verifyuser = await user.findOne({email})

        if(!verifyuser){
          return  res.status(400).json({ message:"This is a new user"})


        }

        

        const uniquepassword = await bcrypt.compare(password, verifyuser.password)

        if(!uniquepassword){
          return   res.status(400).json({meaasge:"wrong password"})
        }

        const token =  jwt.sign({id :user._id} ,process.env.jwt_secert)

      
         

        // res.cookie("token", token , {httpOnly :true})
        res.cookie('token', token, {
          httpOnly: true,
          secure: true, // Ensure cookies are secure in production
          sameSite: 'none', // Required for cross-origin requests
        });


        
         
         return res.status(200).json({message :" login successfull"})

        } catch (err) {
           res.status(400).json({message:err.mesage})
        }
    },
// Adjust based on your model path


 


    logout : async (req,res)=>{
        try {
         console.log("logout");
       
         res.clearCookie('token', {
          httpOnly: true
          // secure: true, // Same as the one used when setting the cookie
          // sameSite: 'none', // Same as the one used when setting the cookie
        });
        res.status(200).json({ message: 'Logout Successful' });

        
        
        } catch (err) {
           res.status(400).json({message:err.message})
        }

    },
    me : async(req,res)=>{
       try {
         console.log("me is login");
         const userid  =  req.userid;

         const User = await user.findOne(userid)
         
        //  const user =await user.findbyID(userid).select("-password -__v -createdAT -updateAt -.id")
         console.log(  "user is " + User);
         
         return res.status(200).json(User)

       }
        catch (err) {
          res.status(400).json({message : err.meaasge})
       }
    },
    forgetpassword :async (req,res)=>{
      try {
        console.log("forget");
    console.log(req.body);
    
      const {email} =req.body
      const  checkemail = await user.findOne({email:email})

      if(!checkemail){
        return res.status(400).json({mesage:"user not found"})
      }

      const token =Math.random().toString(26).slice(-8)
      
      console.log(token );
      
      checkemail.resetPasswordToken = token
 checkemail.resetPasswordExpires = Date.now() + 120000000
 console.log(checkemail.resetPasswordToken);
 
 
  
      await checkemail.save();


      const transpoter  =nodemailer.createTransport({
        service : "gmail",
        auth :{
          user :process.env.gmail,
          pass :process.env.password
        }

      })

      const composeemail = {
       from :process.env.gmail,
       to : checkemail.email,
       subject :"password reset ",
       text :`${token}`,

      }   
        
      await transpoter.sendMail(composeemail)
     return  res.status(200).json({ message: "Password reset email sent successfully!" });
      } catch (err) {

         res.status(400).json({message : err.meaasge})
      }
    },
    setNewPassword: async (req, res) => {
      try {
        console.log('setNewPassword');
        
        const { token, newPassword } = req.body;
    
        if (!token || !newPassword) {
          return res.status(400).json({ message: "Token and new password are required." });
        }
    
        const users = await user.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
        });
    
        if (!users) {
          return res.status(400).json({ message: "Invalid or expired token." });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        users.password = hashedPassword; // Hash password before saving (use bcrypt)
        users.resetPasswordToken = undefined;
        users.resetPasswordExpires = undefined;
        await users.save();
    
        res.status(200).json({ message: "Password updated successfully!" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    
}


module.exports = logincontroller;