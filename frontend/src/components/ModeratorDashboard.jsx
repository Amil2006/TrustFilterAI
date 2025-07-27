import React, { useEffect, useState } from "react";
import "./ModeratorDashboard.css";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const ModeratorDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterReviewer, setFilterReviewer] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showOnlyFake, setShowOnlyFake] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);

      const allReviews = data.flatMap((product) =>
        product.reviews.map((review) => ({
          ...review,
          productId: product._id,
          productTitle: product.title,
          productDescription: product.description,
        }))
      );
      setReviews(allReviews);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error("Failed to fetch reviews/products", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateReview = async (productId, reviewId, action) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${productId}/reviews/${reviewId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        }
      );
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const rerunLLM = async (text, reviewId, productId) => {
    try {
      const res = await fetch("http://localhost:5000/api/llm/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      alert(`LLM Reclassification: ${data.classification.toUpperCase()}`);
      // Optional: auto-update status from response
      await updateReview(productId, reviewId, data.classification === "real" ? "approve" : "reject");
    } catch (err) {
      console.error("LLM Re-run failed", err);
      alert("LLM error occurred.");
    }
  };

  const COLORS = ["#00C49F", "#FF4444"];

  const filtered = reviews.filter((rev) => {
    const matchText =
      filterReviewer === "" ||
      rev.text.toLowerCase().includes(filterReviewer.toLowerCase());
    const matchProduct =
      filterProduct === "" || rev.productTitle === filterProduct;
    const isFake = !showOnlyFake || rev.status === "rejected" || rev.status === "fake";
    return matchText && matchProduct && isFake;
  });

  const pieData = [
    {
      name: "Real",
      value: reviews.filter((r) => r.status === "verified").length,
    },
    {
      name: "Fake",
      value:
        reviews.filter((r) => r.status === "rejected" || r.status === "fake")
          .length,
    },
  ];

  const renderStars = (count = 0) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        style={{
          color: i < count ? "#f0c040" : "#ccc",
          fontSize: "1.1rem",
        }}
      >
        ★
      </span>
    ));

  return (
    <div className="dashboard-container">
      <h2>🛡️ Moderator Dashboard</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by reviewer text"
          value={filterReviewer}
          onChange={(e) => setFilterReviewer(e.target.value)}
        />

        <select
          value={filterProduct}
          onChange={(e) => setFilterProduct(e.target.value)}
        >
          <option value="">All Products</option>
          {products.map((p) => (
            <option key={p._id} value={p.title}>
              {p.title}
            </option>
          ))}
        </select>

        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <input
            type="checkbox"
            checked={showOnlyFake}
            onChange={(e) => setShowOnlyFake(e.target.checked)}
          />
          Fake reviews only
        </label>
      </div>

      <div className="chart-box">
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        <p>Last Updated: {lastUpdated}</p>
      </div>

      <div className="review-list">
        {filtered.map((rev) => (
          <div
            key={rev._id}
            className="review-card"
            style={{
              backgroundColor:
                rev.status === "verified" ? "#e7f2f9ff" : "#f6e8eaff",
            }}
          >
            <p>
              <strong>Product:</strong> {rev.productTitle}
            </p>
            <p>
              <strong>Description:</strong> {rev.productDescription}
            </p>
            <p>
              <strong>Review:</strong> {rev.text}
            </p>
            <p>
              <strong>Rating:</strong> {renderStars(rev.rating || 0)}
            </p>
            <p>
              <strong>Status:</strong> {rev.status}
            </p>
            <div className="review-actions">
              {rev.status === "verified" && (
                <button
                  className="delete-btn"
                  onClick={() =>
                    updateReview(rev.productId, rev._id, "mark-fake")
                  }
                >
                  Mark as Fake
                </button>
              )}
              {(rev.status === "fake" || rev.status === "rejected") && (
                <button
                  className="approve-btn"
                  onClick={() =>
                    updateReview(rev.productId, rev._id, "approve")
                  }
                >
                  Approve
                </button>
              )}
              <button
                className="delete-btn"
                onClick={() => updateReview(rev.productId, rev._id, "delete")}
              >
                Delete
              </button>
              <button
                className="approve-btn"
                onClick={() =>
                  rerunLLM(rev.text, rev._id, rev.productId)
                }
              >
                🔁 Re-run LLM
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeratorDashboard;
