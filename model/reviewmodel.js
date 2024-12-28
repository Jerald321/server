const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
  
    restaurantName: { type: String , ref: 'Restaurant', required: true },
    rating: { type: String, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },

    response: { type: String }, // Owner's response
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    ownerResponse: {
      text: { type: String },
      respondedAt: { type: Date },
    }
  });
module.exports = mongoose.model('review', reviewSchema, "Reviews");