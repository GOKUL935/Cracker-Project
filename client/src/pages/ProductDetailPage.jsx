import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://crackize-server.onrender.com/v1/products`);
        const data = await res.json();
        const found = data.find((p) => p._id === id);
        setProduct(found);
        const relatedItems = data.filter(
          (p) => p.category === found?.category && p._id !== found._id
        );
        setRelated(relatedItems);
      } catch (err) {
        console.error("Error loading product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = product.price * quantity;

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
          <p>{product.pieces || "N/A"} Pieces</p>
          <p style={{ fontSize: "20px", color: "red" }}>₹{totalPrice}</p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
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
