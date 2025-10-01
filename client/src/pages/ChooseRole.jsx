// client/src/pages/ChooseRole.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ChooseRole() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChoose = (role) => {
    if (role === "admin") {
      // Always go to admin access page (password check there)
      navigate("/admin-access");
    } else {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <h2>Welcome {user?.name || ""}!</h2>
      <p style={{ marginBottom: 20 }}>Choose how you want to continue:</p>
      <div style={{ display: "flex", gap: 20 }}>
        <button
          onClick={() => handleChoose("customer")}
          style={{
            padding: "20px 30px",
            fontSize: "18px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: "#007bff",
            color: "#fff",
          }}
        >
          👤 Customer
        </button>
        <button
          onClick={() => handleChoose("admin")}
          style={{
            padding: "20px 30px",
            fontSize: "18px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: "#ff9800",
            color: "#fff",
          }}
        >
          🛠️ Admin
        </button>
      </div>
    </div>
  );
}
