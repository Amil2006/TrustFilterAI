// import React from "react";
// import "./ProductList.css";

// const ProductList = ({ products }) => {
// return (
// <div className="product-list">
// <h2>Product Catalog</h2>
// {products.length === 0 ? (
// <p>No products added yet.</p>
// ) : (
// <div className="product-grid">
// {products.map((product) => (
// <div className="product-card" key={product._id}>
// {product.imageUrl && (
// <img src={product.imageUrl} alt={product.title} />
// )}
// <h3>{product.title}</h3>
// <p>{product.description}</p>
// <p className="price">₹{product.price}</p>
// </div>
// ))}
// </div>
// )}
// </div>
// );
// };

// export default ProductList;
// src/components/ProductList.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./ProductList.css";

// const ProductList = ({ products }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="product-list">
//       {products.map((product) => (
//         <div
//           className="product-card"
//           key={product._id}
//           onClick={() => navigate(`/product/${product._id}`)}
//         >
//           <img src={product.imageUrl} alt={product.title} />
//           <h3>{product.title}</h3>
//           <p>Brand: {product.brand}</p>
//           <p>₹{product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./ProductList.css";

// function ProductList({ products }) {
//   const navigate = useNavigate();

//   return (
//     <div className="product-list-container">
//       <div className="product-list-header">
//         <h2>TrustNet - Product Page</h2>
//         <div className="action-buttons">
//           <button onClick={() => navigate("/add-product")} className="add-btn">
//             Add Product
//           </button>
//           <button onClick={() => navigate("/moderator")} className="mod-btn">
//             Moderator Dashboard
//           </button>
//         </div>
//       </div>

//       <div className="product-list">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="product-card"
//             onClick={() => navigate(`/product/${product._id}`)}
//           >
//             <img
//               src={product.imageUrl}
//               alt={product.title}
//               className="product-img"
//             />
//             <div className="product-details">
//               <h3 className="product-title">{product.title}</h3>
//               <p className="product-brand">{product.brand}</p>
//               <p className="product-desc">
//                 {product.description.length > 200
//                   ? product.description.slice(0, 200) + "..."
//                   : product.description}
//               </p>
//               <p className="product-price">₹{product.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductList;

// src/components/ProductList.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css"; // Optional styling

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products yet.</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="product-img"
            />
            <h3>{product.title}</h3>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p>{product.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
