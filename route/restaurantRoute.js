const  express = require("express")
const route =express.Router();
const reservationcontroller = require("../controller/reservationcon") 
const userReviewController = require("../controller/userReviewcon")
// const upload = require("../utils/cloudinary")
const restaurantcontroller = require("../controller/restaurantcon")
const restaurant = require("../model/restaurantmodel")
const upload  =require('../utils/multer')
const http = require('http')
const  logincontroller = require('../controller/logincontroller')
const auth = require('../utils/auth')




//reservation details

route.post("/reservation", reservationcontroller.reservationCreate)
route.post("/reservation/checkAvailability/:id", reservationcontroller.checkAvailability)
route.put("/reservation/:id", reservationcontroller.updateReservation)
route.delete("/reservation/:id", reservationcontroller.deleteReservation)
route.get("/reservation/allreservation", reservationcontroller.allreservation)



// //review 
route.post("/review",  userReviewController.review)
route.get("/review",  userReviewController.allreview)
route.delete("/review/:id",  userReviewController.deleteReview )
route.put("/review/:id",  userReviewController.updateReview  )


// resturant 
route.post("/restaurant", (req,res,next)=>{
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next(); 
    })
}, restaurantcontroller.restaurantcreate)
route.get("/restaurant", restaurantcontroller.getAllRestaurant)
route.put("/restaurant/:id",(req,res,next)=>{
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next(); 
    }) }, restaurantcontroller.restaurantupdate)

route.delete("/restaurant/:id", restaurantcontroller.deleteRestaurant  )


route.get("/:id/tables", restaurantcontroller.getTableAvailability);


// login
route.post("/register", logincontroller.register)
route.get("/admin", logincontroller.admin)
route.post("/login", logincontroller.login)
route.post("/logout", logincontroller.logout)
route.post("/forgetpassword", logincontroller.forgetpassword)
route.post("/setNewPassword", logincontroller.setNewPassword)
route.get("/me" ,  auth.authverify, logincontroller.me)


module.exports =route

