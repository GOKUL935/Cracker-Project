// client/src/pages/AdminAccess.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminAccess() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If not logged in, force to auth page
  if (!token) {
    navigate("/auth");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // simple client-side check (user requested)
    if (password === "1234") {
      // set a short-lived client-side flag that admin was unlocked
      sessionStorage.setItem("admin_unlocked", "true");

      // optional: store the admin-name for UI (not used by server)
      sessionStorage.setItem("admin_name_try", name || user?.name || "Admin");

      // go to admin dashboard
      navigate("/admin");
    } else {
      setError("Invalid admin password");
    }
  };

  return (
    <div style={{ minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
      <div style={{ width: 420, padding: 24, borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.08)", background: "#fff" }}>
        <h3 style={{ marginBottom: 8 }}>Admin Access</h3>
        <p style={{ color: "#666", marginBottom: 16 }}>
          Enter admin password to open admin page. (Name can be anything.)
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name (any)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ddd" }}
          />
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ddd" }}
          />

          {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 6,
                border: "none",
                background: "#ff9800",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Enter Admin
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              style={{
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>

        <p style={{ marginTop: 12, color: "#777", fontSize: 13 }}>
          Note: This is a client-side gate you requested. Server admin APIs still require a real admin token/role.
        </p>
      </div>
    </div>
  );
}
