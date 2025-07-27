import React, { useState } from "react";
import "./AddProductForm.css";

const AddProductForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !brand || !description || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image); // Send file

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      onAdd(data);
      // Clear form
      setTitle("");
      setBrand("");
      setDescription("");
      setPrice("");
      setImage(null);
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Brand Name"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
