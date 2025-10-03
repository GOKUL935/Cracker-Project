import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products.json"; // ✅ JSON import
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams(); // URL la iruka id
  const product = products.find((p) => p.id.toString() === id);

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <h2>Product not found ❌</h2>;
  }

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = product.price * quantity;

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "30px" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "400px", borderRadius: "10px" }}
        />

        <div>
          <h2>{product.name}</h2>
          <p>{product.pieces} Pieces</p>
          <p style={{ fontSize: "20px", color: "red" }}>₹{totalPrice}</p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <button onClick={decreaseQty} style={{ padding: "5px 10px" }}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={increaseQty} style={{ padding: "5px 10px" }}>
              +
            </button>
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

      {/* Additional Info */}
      <div style={{ marginTop: "40px" }}>
        <h3>Additional Information</h3>
        <table border="1" cellPadding="10" style={{ marginTop: "10px" }}>
          <tbody>
            <tr>
              <td>Box</td>
              <td>{product.box || "1"}</td>
            </tr>
            <tr>
              <td>Market Selling Price</td>
              <td>₹{product.mrp || product.price * 2}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>{product.discount || "70% - 85%"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Related Products */}
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
          {relatedProducts.map((rp) => (
            <div
              key={rp.id}
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
                to={`/product/${rp.id}`}
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
