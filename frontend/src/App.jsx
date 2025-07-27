import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ModeratorDashboard from "./components/ModeratorDashboard";
import Navbar from "./components/Navbar";
import "./App.css";

const HomePage = ({ products, handleAddProduct, showForm, toggleForm }) => {
  return (
    <>
      {showForm && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <AddProductForm onAdd={handleAddProduct} />
        </div>
      )}
      <ProductList products={products} />
    </>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: newProduct,
      });
      if (!res.ok) throw new Error("Failed to add product");
      const createdProduct = await res.json();
      setProducts((prev) => [...prev, createdProduct]);
      setShowForm(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleForm = () => setShowForm((prev) => !prev);

  return (
    <>
      <Navbar
        toggleForm={toggleForm}
        showForm={showForm}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              handleAddProduct={handleAddProduct}
              showForm={showForm}
              toggleForm={toggleForm}
            />
          }
        />
        <Route path="/moderator" element={<ModeratorDashboard />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
