import { Link, useLocation } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const Navbar = () => {
  const location = useLocation();
  const { searchTerm, setSearchTerm } = useSearch();

  // 🔹 Safe user parsing from localStorage
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.error("Invalid user JSON in localStorage:", err);
    user = null;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#222",
        color: "#fff",
      }}
    >
      {/* 🔹 Logo */}
      <Link
        to="/"
        style={{
          color: "#fff",
          fontSize: "22px",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        Crackers Shop
      </Link>

      {/* 🔹 Links */}
      <div>
        <Link
          to="/"
          style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}
        >
          Home
        </Link>
        <Link
          to="/products"
          style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}
        >
          Products
        </Link>
        <Link
          to="/cart"
          style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}
        >
          Cart
        </Link>

        {/* 🔹 Admin link only for admin users */}
        {user && user.role === "admin" && (
          <Link
            to="/admin"
            style={{
              margin: "0 15px",
              color: "#ff9800",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Admin
          </Link>
        )}
      </div>

      {/* 🔹 Search Box → Only in /products */}
      {location.pathname === "/products" && (
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          style={{
            padding: "6px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "250px",
            color: "black",
            backgroundColor: "#fff",
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
