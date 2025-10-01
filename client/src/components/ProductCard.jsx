import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, null, quantity);
    alert(`${product.name} added to cart! ✅`);
  };

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "15px",
        textAlign: "center",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      {/* IMAGE + NAME clickable */}
      <div onClick={() => navigate(`/product/${product.id}`)}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "contain",
          }}
        />
        <h3 style={{ margin: "10px 0", fontSize: "16px" }}>{product.name}</h3>
      </div>

      <p style={{ fontSize: "14px", color: "#555" }}>
        ({product.pieces} Pieces)
      </p>
      <p style={{ fontSize: "13px", color: "#666", margin: "8px 0" }}>
        {product.description}
      </p>
      <p style={{ color: "#FFD700", margin: "5px 0" }}>★★★★★</p>

      <p
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#e63946",
        }}
      >
        ₹{product.price * quantity}
      </p>

      {product.mrp && (
        <p style={{ textDecoration: "line-through", color: "#888" }}>
          MRP: ₹{product.mrp * quantity}
        </p>
      )}

      {/* Quantity Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
          gap: "10px",
        }}
      >
        <button
          onClick={handleDecrease}
          style={{
            padding: "5px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#f5f5f5",
            cursor: "pointer",
          }}
        >
          -
        </button>
        <span style={{ fontWeight: "bold" }}>{quantity}</span>
        <button
          onClick={handleIncrease}
          style={{
            padding: "5px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#f5f5f5",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        style={{
          background: "#ff4d4d",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
