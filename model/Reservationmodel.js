const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: { type: String, },
  restaurantName: { type:String, },
  bookingDate: { type: String ,  },
  bookingTime: { type: String, },
  partySize: { type: Number, },
  createdAt: { type: Date, default: Date.now },
});





module.exports = mongoose.model('reservation', reservationSchema, "Reservations")
  
  




// . API Endpoints:
// POST /api/reservations: Create a reservation.
// Validate inputs (date, time, party size).
// Check availability before saving the reservation.
// GET /api/reservations/user/:userId: Retrieve reservations for a user.
// PATCH /api/reservations/:id: Modify an existing reservation.
// DELETE /api/reservations/:id: Cancel a reservation.

// const checkAvailability = async (restaurantId, date, time, partySize) => {
//     const reservations = await Reservation.find({ restaurantId, date, time });
//     const totalReserved = reservations.reduce((sum, res) => sum + res.partySize, 0);
  
//     const restaurant = await Restaurant.findById(restaurantId);
//     return totalReserved + partySize <= restaurant.capacity;
//   };





// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
//   rating: { type: Number, required: true, min: 1, max: 5 },
//   comment: { type: String, required: true },
//   photos: [{ type: String }], // URLs of uploaded photos
//   response: { type: String }, // Owner's response
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date },
// });

// module.exports = mongoose.model('Review', reviewSchema);


// // .. API Endpoints:
// // POST /api/reviews: Create a new review.
// // Validate user permissions (ensure they’ve made a reservation).
// // Allow image uploads (e.g., integrate AWS S3 or Cloudinary for storage).
// // GET /api/reviews/restaurant/:restaurantId: Retrieve all reviews for a specific restaurant.
// // PATCH /api/reviews/:id: Allow users to edit their reviews or owners to respond.
// // Validate that the user is the review author or the owner of the restaurant.
// // DELETE /api/reviews/:id: Allow users to delete their reviews

// // 3. Middleware for Authorization:
// // Ensure only:

// // The review author can edit/delete their review.
// // The restaurant owner can respond to reviews.


// // Database Integration for Reviews:
// // averageRating: { type: Number, default: 0 },
// // totalReviews: { type: Number, default: 0 },

// // Optional Enhancements:
// // Like/Dislike Reviews: Let users upvote helpful reviews.
// // Flagging System: Allow users to report inappropriate reviews.
// // Filters and Sorting:
// // Sort reviews by rating, date, or helpfulness.
// // Filter reviews with specific star ratings or photos.


// const restaurantSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     location: { type: String, required: true },
//     cuisine: { type: [String], required: true }, // Array of cuisines
//     priceRange: { type: Number, required: true }, // 1 ($) to 5 ($$$$$)
//     dietaryRestrictions: { type: [String] }, // E.g., Vegan, Gluten-Free
//     ambiance: { type: [String] }, // E.g., Romantic, Casual
//     specialFeatures: { type: [String] }, // E.g., Outdoor Seating, Live Music
//     averageRating: { type: Number, default: 0 },
//   });
//   restaurantSchema.index({ name: 'text', cuisine: 'text', location: 'text' });


//   // GET /api/restaurants
// // router.get('/restaurants', async (req, res) => {
// //     const { search, cuisine, priceRange, location, dietary, ambiance, features } = req.query;
  
// //     const query = {};
  
// //     if (search) {
// //       query.$or = [
// //         { name: new RegExp(search, 'i') },
// //         { cuisine: new RegExp(search, 'i') },
// //         { location: new RegExp(search, 'i') },
// //       ];
// //     }
  
// //     if (cuisine) query.cuisine = { $in: cuisine.split(',') };
// //     if (priceRange) query.priceRange = { $lte: priceRange }; // Adjust for range-based filtering
// //     if (location) query.location = new RegExp(location, 'i');
// //     if (dietary) query.dietaryRestrictions = { $in: dietary.split(',') };
// //     if (ambiance) query.ambiance = { $in: ambiance.split(',') };
// //     if (features) query.specialFeatures = { $in: features.split(',') };
  
// //     const restaurants = await Restaurant.find(query).sort({ averageRating: -1 });
// //     res.json(restaurants);
// //   });



// const restaurantSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String },
//     address: { type: String, required: true },
//     location: { type: { lat: Number, lng: Number }, required: true }, // For map integration
//     contact: {
//       phone: { type: String },
//       email: { type: String },
//       website: { type: String },
//     },
//     hours: {
//       monday: { open: String, close: String },
//       tuesday: { open: String, close: String },
//       // Add for all days
//     },
//     menu: [
//       {
//         category: String,
//         items: [
//           { name: String, description: String, price: Number, image: String },
//         ],
//       },
//     ],
//     photos: [{ type: String }], // URLs for images
//     owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     features: [String], // Dietary, ambiance, and special features
//   });


// //   API Endpoints:
// // GET /api/restaurants/:id: Fetch detailed profile data for a restaurant.
// // POST /api/restaurants: Allow restaurant owners to create a profile.
// // PATCH /api/restaurants/:id: Update profile details.
// // Validate that the logged-in user is the owner.
// // POST /api/restaurants/:id/photos: Upload and attach new photos.
// // Use a service like Cloudinary or AWS S3 for image storage.
// // DELETE /api/restaurants/:id/photos/:photoId: Remove specific photos.
  
// // 3. Middleware for Role-Based Access:
// // Ensure only authenticated restaurant owners can manage their profiles:

// // javascript
// // Copy code
// // const authorizeOwner = async (req, res, next) => {
// //   const restaurant = await Restaurant.findById(req.params.id);
// //   if (!restaurant || restaurant.owner.toString() !== req.user.id) {
// //     return res.status(403).json({ message: 'Unauthorized' });
// //   }
// //   next();
// // };
  
// // . File Uploads:
// // Integrate with Cloudinary or AWS S3 for photo uploads.
// // Allow image resizing and compression for better performanc

// // const isOpen = (hours) => {
// //     const now = new Date();
// //     const day = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
// //     const currentTime = `${now.getHours()}:${now.getMinutes()}`;
// //     return hours[day]?.open <= currentTime && currentTime <= hours[day]?.close;
// //   };


// const availabilitySchema = new mongoose.Schema({
//     restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
//     date: { type: Date, required: true },
//     timeSlots: [
//       {
//         time: String, // E.g., "18:00"
//         capacity: Number, // Total capacity for the time slot
//         booked: Number, // Number of tables currently booked
//       },
//     ],
//   });

// //   API Endpoints:
// //   GET /api/availability/:restaurantId:
// //   Fetch availability for a specific restaurant by date.
// //   Query availabilitySchema for the given restaurant and date.
// //   POST /api/bookings:
// //   When a booking is made:
// //   Check if the requested slot is still available.
// //   If available, decrement the available slots and save the booking.
// //   Use transactions to ensure atomic updates (e.g., MongoDB transactions).
// //   PATCH /api/availability/:restaurantId:
// //   Allow restaurant owners to manually adjust availability for specific slots.
 

// // Prevent Overbooking:
// // Use atomic operations to handle concurrent booking requests. For example:
// // javascript
// // Copy code
// // const slot = await Availability.findOneAndUpdate(
// //   { restaurantId, date, 'timeSlots.time': requestedTime, 'timeSlots.booked': { $lt: capacity } },
// //   { $inc: { 'timeSlots.$.booked': 1 } },
// //   { new: true }
// // );

// // if (!slot) {
// //   throw new Error('Time slot no longer available.');
// // }

// // Real-Time Updates
// // 1. WebSockets (Preferred):
// // Server-Side:
// // Use a WebSocket library like Socket.IO to broadcast changes to all connected clients.
// // Trigger updates whenever a new booking is made or a cancellation occurs.
// // Client-Side:
// // Subscribe to real-time updates and re-render the availability grid dynamically.
// // 2. Polling (Fallback):
// // If WebSockets are not an option, implement a polling mechanism that periodically fetches updated availability data.
  

// const userSchema = new mongoose.Schema({
//     name: String,
//     preferences: {
//       cuisines: [String],
//       priceRange: { min: Number, max: Number },
//       specialFeatures: [String],
//     },
//     searchHistory: [{ type: String }], // Keywords or restaurant IDs
//     reviewedRestaurants: [{ 
//       restaurantId: mongoose.Schema.Types.ObjectId, 
//       rating: Number 
//     }],
//   });
  
//   const restaurantSchema = new mongoose.Schema({
//     name: String,
//     cuisine: [String],
//     priceRange: Number,
//     averageRating: Number,
//     popularityScore: { type: Number, default: 0 }, // Computed from reviews and bookings
//   });
  

// //   const recommendedRestaurants = await Restaurant.find({
// //     cuisine: { $in: user.preferences.cuisines },
// //     priceRange: { $gte: user.preferences.priceRange.min, $lte: user.preferences.priceRange.max },
// //     specialFeatures: { $in: user.preferences.specialFeatures },
// //   }).sort({ averageRating: -1, popularityScore: -1 });
  
// // const trendingRestaurants = await Restaurant.aggregate([
// //     { $addFields: { score: { $add: ['$averageRating', '$popularityScore'] } } },
// //     { $sort: { score: -1 } },
// //     { $limit: 10 },
// //   ]);
  

// // app.get('/api/recommendations/:userId', async (req, res) => {
// //     const recommendations = await getRecommendationsForUser(req.params.userId);
// //     res.json(recommendations);
// //   });


// const flaggedReviewSchema = new mongoose.Schema({
//     reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: true },
//     reason: { type: String },
//     flaggedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     resolved: { type: Boolean, default: false },
//   });
  
//   const adminLogSchema = new mongoose.Schema({
//     adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     action: String,
//     target: String,
//     timestamp: { type: Date, default: Date.now },
//   });



// // Admin-Specific Endpoints:

// // GET /api/admin/restaurants: Fetch all restaurants with pagination.
// // POST /api/admin/restaurants/:id/approve: Approve or reject a restaurant listing.
// // GET /api/admin/reviews: Fetch all reviews with filters for flagged/inappropriate ones.
// // PATCH /api/admin/reviews/:id: Edit or delete user reviews.
// // GET /api/admin/reservations: Fetch all reservations.
// // POST /api/admin/reservations/:id/cancel: Cancel a reservation.


// // Role-Based Access Control
// // const isAdmin = (req, res, next) => {
// //     if (req.user.role !== 'admin') {
// //       return res.status(401).json({ message: 'Unauthorized' });
// //     }
// //     next();
// //   };
  
  