const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    restaurantName: { type: String,   },
    location: { type: String,    },
    cuisine: { type: [String],   }, // Array of cuisines
    priceRange: { type: String,  }, // 1 ($) to 5 ($$$$$)
   
    ambiance: { type: String,  }, // E.g., Romantic, Casual
    specialFeatures: { type: String , }, // E.g., Outdoor Seating, Live Music
    averageRating: { type: Number, default: 0 },
    image: { type: String,}, // Cloudinary image URL
    tables: [
      {
          tableNumber: { type: Number, required: true },
          capacity: { type: Number, required: true },
          isAvailable: { type: Boolean, default: true },
          bookingDate: { type: String, default: true },
          status : {type :String, required: true, default: "available"},
          bookedBy: { type: String, default: null }, // User ID or null if available
          bookingTime: { type: String, default: null }, // When the table was booked
          reservationExpiresAt: { type: String, default: null }
      }
  ]
    
  });

module.exports = mongoose.model("restaurant" ,restaurantSchema,  "Restaurants" )