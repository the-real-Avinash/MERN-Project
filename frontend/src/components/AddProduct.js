import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }

    console.log(name, price, category, company);
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userID }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product Name"
        className="input-box"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && <span className="error-box">Enter valid name</span>}

      <input
        type="text"
        placeholder="Enter product price"
        className="input-box"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && <span className="error-box">Enter valid price</span>}
      <input
        type="text"
        placeholder="Enter product category"
        className="input-box"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="error-box">Enter valid category</span>
      )}
      <input
        type="text"
        placeholder="Enter product company"
        className="input-box"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {error && !company && (
        <span className="error-box">Enter valid company</span>
      )}
      <button onClick={addProduct} className="product-button">
        Add Button
      </button>
    </div>
  );
};

export default AddProduct;
