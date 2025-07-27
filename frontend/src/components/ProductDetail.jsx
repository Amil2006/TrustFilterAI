import "./ProductDetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0); // no default
  const [hover, setHover] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [id]);


const submitReview = async () => {
  if (!newReview || rating === 0) return alert("Enter review and rating");

  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newReview, rating }), // ✅ rating must be sent
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Review submission error:", errorData);
      alert("Failed to submit review. " + (errorData.error || "Invalid response."));
      return;
    }

    const updatedProduct = await res.json();
    setProduct(updatedProduct);
    setNewReview("");
    setRating(0);
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong. Check the console.");
  }
};

const getStatusTag = (status) => {
  switch (status) {
    case "verified":
    case "real":
      return <span style={{ color: "green" }}>✅ (real)</span>;
    case "fake":
    case "rejected":
      return <span style={{ color: "red" }}>❌ (fake)</span>;
    default:
      return <span style={{ color: "gray" }}>⏳ (pending)</span>;
  }
};


  const renderStars = (count) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < count ? "#f0c040" : "#ccc", fontSize: "1.2rem" }}>★</span>
    ));

  return (
    <div className="product-detail">
      {product ? (
        <>
          <h2>{product.title}</h2>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <img src={product.imageUrl} alt={product.title} style={{ width: "300px", borderRadius: "8px" }} />

          <h3>Reviews</h3>
          {product.reviews?.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {Array.isArray(product.reviews) && product.reviews.map((rev, idx) => (
                <li key={idx} style={{ marginBottom: "1rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>
                  <div>{renderStars(rev.rating || 0)}</div>
                  <p>{rev.text}</p>
                  <div>{getStatusTag(rev.status)}</div>
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: "2rem" }}>
            <h4>Add a Review</h4>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows={3}
              placeholder="Write your review..."
              style={{ width: "100%", marginBottom: "1rem" }}
            />

            {/* Star input with hover */}
            <div style={{ marginBottom: "1rem" }}>
              <label>Rating: </label>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    cursor: "pointer",
                    color: star <= (hover || rating) ? "#f0c040" : "#ccc",
                    fontSize: "1.6rem",
                    marginRight: "4px",
                    transition: "color 0.2s",
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <button onClick={submitReview}>Submit Review</button>
          </div>
        </>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default ProductDetail;

