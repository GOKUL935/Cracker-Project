import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);

  // ✅ Fetch selected product from backend
  useEffect(() => {
    fetch("https://crackize-server.onrender.com/v1/products")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p._id === id);
        setProduct(found);
        setRelated(data.filter((p) => p.category === found.category && p._id !== found._id));
      })
      .catch((err) => console.error("❌ Error fetching product details:", err));
  }, [id]);

  if (!product) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading product...</h2>;
  }

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => quantity > 1 && setQuantity(quantity - 1);

  const totalPrice = product.price * quantity;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "400px", borderRadius: "10px" }}
        />

        <div>
          <h2>{product.name}</h2>
          <p>{product.pieces} Pieces</p>
          <p style={{ fontSize: "20px", color: "red" }}>₹{totalPrice}</p>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
            <button onClick={decreaseQty}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <button
            onClick={() => addToCart(product, null, quantity)}
            style={{
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3>Additional Information</h3>
        <table border="1" cellPadding="10" style={{ marginTop: "10px" }}>
          <tbody>
            <tr>
              <td>Box</td>
              <td>{product.box || "1"}</td>
            </tr>
            <tr>
              <td>Market Price</td>
              <td>₹{product.mrp || product.price * 2}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>{product.discount || "70% - 85%"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3>Related Products</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {related.map((rp) => (
            <div
              key={rp._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={rp.image}
                alt={rp.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h4>{rp.name}</h4>
              <p>₹{rp.price}</p>
              <Link
                to={`/product/${rp._id}`}
                style={{
                  display: "inline-block",
                  marginTop: "5px",
                  padding: "5px 10px",
                  background: "red",
                  color: "#fff",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
