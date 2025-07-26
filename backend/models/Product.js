const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  text: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  status: {
    type: String,
    enum: ["pending", "real", "fake", "verified", "rejected"],
    default: "pending",
  },
  confidence: {
    type: Number,
    default: 1,
  },
});

const productSchema = new mongoose.Schema({
  title: String,
  brand: String,
  description: String,
  price: Number,
  imageUrl: String,
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Product", productSchema);
