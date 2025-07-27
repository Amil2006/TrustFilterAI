// src/components/ProductCard.jsx
import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
