const { json } = require('express');
const  restaurant = require('../model/restaurantmodel')
const restaurantcontroller ={
    restaurantcreate : async(req,res)=>{
           
             try {
                const {
                    restaurantName, location, cuisine,
                    priceRange, ambiance, specialFeatures,
                    averageRating,tables
                } = req.body;

                console.log(req.body);
                
        
                // if (!restaurantName || !location || !cuisine || !priceRange || !ambiance || !specialFeatures || !averageRating) {
                //     return res.status(400).json({ message: "Required restaurant data is missing." });
                // }
        
                // Check if the restaurant already exists
                const verifyRestaurant = await restaurant.findOne({ restaurantName });
                
                if (verifyRestaurant) {
                    return res.status(400).json({message: "Restaurant already exists." });
                }
        
                // Retrieve the image URL from Multer
                const imageUrl = req.file?.path || null;
                console.log(imageUrl);
                
        
                // Create and save the new restaurant
                const newRestaurant = new restaurant({
                    restaurantName,
                    location,
                    cuisine,
                    priceRange,
                    ambiance,
                    specialFeatures,
                    averageRating,
                    image: imageUrl,
                    tables
                });
        
                await newRestaurant.save();
        
                // Send success response
                return res.status(201).json({ message: "Restaurant created successfully.", restaurant: newRestaurant });
            } catch (error) {
                console.error("Error creating restaurant:", error);
                return res.status(500).json({ error: error.message });
            }
        
    
   
    },
    getAllRestaurant :async(req,res)=>{
        try {
            console.log("all restaurant data get");
            
            const allrestaurant =await  restaurant.find() 
            
            res.status(200).json(allrestaurant)
        } catch (error) {
            res.status(400).json({error:error.message})   
        }
       


    },
    restaurantupdate : async(req, res)=>{
     try {
        const {id} = req.params
     console.log(id);
    
    
     const { restaurantName, location, cuisine,
        priceRange, ambiance, specialFeatures,
        averageRating}= req.body
    
     const  updateRestaurantname = await restaurant.findById(id)
   
     
    if(!updateRestaurantname){
        res.status(400).json({message:"restaurant in not here"})
    }
    
    const imageUrl = req.file?.path 

    if(restaurantName, location, cuisine,
        priceRange, ambiance, specialFeatures,
        averageRating){
    
    updateRestaurantname.restaurantName = restaurantName 
    updateRestaurantname.location = location
    updateRestaurantname.priceRange =priceRange
    updateRestaurantname.averageRating =averageRating
    updateRestaurantname.specialFeatures =specialFeatures
    updateRestaurantname.cuisine =cuisine
    updateRestaurantname.ambiance =ambiance
  
   
        }

        if (req.file) {
            updateRestaurantname.image = imageUrl
        }

       
    await  updateRestaurantname.save()
    res.status(200).json({message:
        'successfully update in your restaurant'
    })
        
     } catch (error) {
        res.status(400).json({error:error.message})
     }


    },
    deleteRestaurant: async(req,res)=>{
      try {

        const {id} = req.params
    
        const deleteRestaurant = await restaurant.findByIdAndDelete(id)
    
        res.status(200).json({
          message:"delete sucessfully "
    
          })
        
      } catch(err)
      
      {
            res.status(400).json({err:err.message })
      }
        
    

       
        
      },
      getTableAvailability : async (req, res) => {
        try {
            const {id } = req.params;
    
            const Restaurant = await restaurant.findById(id);
            if (!Restaurant) return res.status(404).json({ message: "Restaurant not found" });
    
            res.status(200).json({ tables: Restaurant.tables });
        } catch (error) {
            res.status(500).json({ message: "Error retrieving table availability", error });
        }
    },
    bookTable  : async (req, res) => {
        try {
            const {id, tableNumber, userId, reservationDuration } = req.body;
    
            const Restaurant = await restaurant.findById(id);
            if (Restaurant) return res.status(404).json({ message: "Restaurant not found" });
    
            const table = restaurant.tables.find(t => t.tableNumber === parseInt(tableNumber));
            if (!table) return res.status(404).json({ message: "Table not found" });
    
            // Check if table is available
            if (!table.isAvailable) {
                const currentTime = new Date();
                // Auto-release the table if the reservation has expired
                if (table.reservationExpiresAt && table.reservationExpiresAt < currentTime) {
                    table.isAvailable = true;
                    table.bookedBy = null;
                    table.bookingTime = null;
                    table.reservationExpiresAt = null;
                } else {
                    return res.status(400).json({ message: "Table is already booked" });
                }
            }
    
            // Book the table
            table.isAvailable = false;
            table.bookedBy = userId;
            table.bookingTime = new Date();
            table.reservationExpiresAt = new Date(new Date().getTime() + reservationDuration * 60000); // Duration in minutes
    
            await restaurant.save();
    
            res.status(200).json({ message: "Table booked successfully", table });
        } catch (error) {
            res.status(500).json({ message: "Error booking table", error });
        }
    },
    cancelBooking : async (req, res) => {
        try {
            const { restaurantId, tableNumber } = req.body;
    
            const restaurant = await Restaurant.findById(restaurantId);
            if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    
            const table = restaurant.tables.find(t => t.tableNumber === tableNumber);
            if (!table) return res.status(404).json({ message: "Table not found" });
    
            if (table.isAvailable) return res.status(400).json({ message: "Table is not currently booked" });
    
            // Reset table status
            table.isAvailable = true;
            table.bookedBy = null;
            table.bookingTime = null;
            table.reservationExpiresAt = null;
    
            await restaurant.save();
    
            res.status(200).json({ message: "Booking cancelled successfully", table });
        } catch (error) {
            res.status(500).json({ message: "Error cancelling booking", error });
        }
    },
    clearExpiredBookings : async (req, res) => {
        try {
            const currentTime = new Date();
    
            const restaurants = await Restaurant.find();
            for (const restaurant of restaurants) {
                restaurant.tables.forEach(table => {
                    if (table.reservationExpiresAt && table.reservationExpiresAt < currentTime) {
                        table.isAvailable = true;
                        table.bookedBy = null;
                        table.bookingTime = null;
                        table.reservationExpiresAt = null;
                    }
                });
    
                await restaurant.save();
            }
    
            res.status(200).json({ message: "Expired bookings cleared successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error clearing expired bookings", error });
        }
    }

  
    }





module.exports = restaurantcontroller;



