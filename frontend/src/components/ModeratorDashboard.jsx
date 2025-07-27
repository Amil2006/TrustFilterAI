import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ModeratorDashboard = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((products) => {
        const reviewsWithMeta = [];
        products.forEach((product) => {
          product.reviews?.forEach((review, index) => {
            if (review.status === "pending") {
              reviewsWithMeta.push({
                productId: product._id,
                productTitle: product.title,
                reviewText: review.text,
                index,
              });
            }
          });
        });
        setPendingReviews(reviewsWithMeta);
      });
  }, []);

  const handleLLMDetect = async (review) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/llm/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: review.reviewText }),
      });
      const data = await res.json();
      alert(`LLM Classification: ${data.classification.toUpperCase()}\nConfidence: ${data.confidence * 100}%`);
    } catch (err) {
      console.error("Detection error:", err);
      alert("Error during LLM classification");
    }
    setLoading(false);
  };

  const handleModeration = async (productId, index, action) => {
    await fetch(`http://localhost:5000/api/products/${productId}/reviews/${index}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: action }),
    });

    setPendingReviews((prev) =>
      prev.filter((r) => !(r.productId === productId && r.index === index))
    );
  };

  return (
    <div className="moderator-dashboard">
      <h2>🛡️ Moderator Dashboard</h2>
      {pendingReviews.length === 0 ? (
        <p>No pending reviews.</p>
      ) : (
        pendingReviews.map((r, i) => (
          <div key={i} className="review-card">
            <p><strong>Product:</strong> <Link to={`/product/${r.productId}`}>{r.productTitle}</Link></p>
            <p><strong>Review:</strong> {r.reviewText}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
              <button onClick={() => handleModeration(r.productId, r.index, "verified")}>✅ Approve</button>
              <button onClick={() => handleModeration(r.productId, r.index, "rejected")}>❌ Reject</button>
              <button onClick={() => handleLLMDetect(r)} disabled={loading}>🔍 LLM Detect</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ModeratorDashboard;
