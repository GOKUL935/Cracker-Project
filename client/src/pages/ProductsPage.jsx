import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

function ProductsPage() {
  const { addToCart } = useCart();
  const { searchTerm } = useSearch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from Render backend API (MongoDB)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ⚠️ Replace this link with your Render backend live URL if different
        const res = await fetch("https://crackize-server.onrender.com/v1/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart ✅`);
  };

  // 🔎 Filter by search term
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading products...</p>;
  }

  return (
    <div
      className="products-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      {filteredProducts.length === 0 ? (
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          No products found ❌
        </p>
      ) : (
        filteredProducts.map((product) => (
          <div
            key={product._id}
            className="product-card"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              width: "220px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            {/* 👇 Product details link */}
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
                {product.name}
              </h3>
            </Link>

            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
              ₹{product.price}
            </p>

            {/* 👇 Add to Cart button */}
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductsPage;
