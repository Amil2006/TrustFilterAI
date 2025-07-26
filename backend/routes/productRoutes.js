const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const Product = require("../models/Product");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "trustnet-products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});
const upload = multer({ storage });


// =========================
// 🔹 Get all products
// =========================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================
// 🔹 Get single product by ID
// =========================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================
// 🔹 Add new product
// =========================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, brand } = req.body;
    const imageUrl = req.file.path;

    const product = new Product({
      title,
      description,
      price,
      brand,
      imageUrl,
      reviews: [],
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// =========================
// 🔹 Add a review (via LLM)
// =========================
router.post("/:id/reviews", async (req, res) => {
  const { text, rating } = req.body;
  console.log("📩 Incoming review:", { text, rating });

  if (!text || !rating) {
    console.log("❌ Missing text or rating");
    return res.status(400).json({ error: "Review text and rating are required" });
  }

  try {
    // Step 1: LLM classify
    const llmRes = await axios.post("http://localhost:5000/api/llm/detect", { text });
    console.log("🧠 LLM raw response:", llmRes.data);
    const classification = llmRes.data.classification || "pending";
    const confidence = llmRes.data.confidence || 1;

    // Step 2: Get product and add review
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.reviews.push({
      text,
      rating: Number(rating), // ✅ ensure it's a number
      status: classification === "real" ? "verified" : classification,
      confidence,
    });

    await product.save(); // 🛑 Likely failing here
    console.log("✅ Review added successfully!");
    res.json(product);
  } catch (err) {
    console.error("🔥 Error saving review:", err); // Show the real error
    res.status(500).json({ error: "Review submission failed" });
  }
});




// =========================
// 🔹 Approve / reject review
// =========================
router.patch("/:productId/reviews/:reviewIndex", async (req, res) => {
  try {
    const { productId, reviewIndex } = req.params;
    const { status } = req.body; // "verified" or "rejected"

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!["verified", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    if (!product.reviews[reviewIndex])
      return res.status(404).json({ message: "Review not found" });

    if (status === "verified") {
      product.reviews[reviewIndex].status = "real";
    } else if (status === "rejected") {
      product.reviews[reviewIndex].status = "fake";
    }

    await product.save();

    res.status(200).json({ message: `Review ${status}` });
  } catch (err) {
    res.status(500).json({ message: "Error moderating review" });
  }
});

module.exports = router;
