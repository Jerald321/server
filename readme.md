 ## project description
 Create a platform for making restaurant reservations and reading user reviews. Features should include real-time availability, reservation management, and user-generated reviews. Implement search filters for cuisine types, price ranges, and locations, and offer features for sharing dining experiences and recommendations.




## api endpoint


## reservation

route.post("/reservation/checkAvailability/:id") = checkAvailability
route.put("/reservation/:id") = updateReservation
route.delete("/reservation/:id") =deleteReservation
route.get("/reservation/allreservation") =   reservation

## review 
route.post("/review",) =user reviw
route.delete("/review/:id") = deleteReview 
route.put("/review/:id",) =updateReview  

## resturant  admin only

route.post("/restaurant") =restaurantcreate
route.get("/restaurant") =getAllRestaurant
route.put("/restaurant/:id") =restaurantupdate

route.delete("/restaurant/:id") =deleteRestaurant  


route.get("/:id/tables") = getTableAvailability







## login
post(/api/v1/register)= create a new user
post(/api/v1/login) = user login
post("/api/v1/logout") = user logout
get("/api/v1/admin") = admin get all user data
get("/api/v1/me") = user details
get("/api/v1/forgetpassword") = forget password
get("/api/v1/setNewPassword") = reset password