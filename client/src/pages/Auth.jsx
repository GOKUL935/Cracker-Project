import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // 🔹 LOGIN
        const res = await fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          alert("Login Successfully");
          login(data.token, data.user); // ✅ save both token & user
          navigate("/choose-role");
        } else {
          alert(data.error || "Login failed");
        }
      } else {
        // 🔹 SIGNUP
        const res = await fetch("http://localhost:4000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
          alert("Registered Successfully");
          setIsLogin(true);
          setForm({ name: "", email: "", password: "" });
        } else {
          alert(data.error || "Signup failed");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: 350,
          padding: 20,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              marginRight: 10,
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              background: isLogin ? "#007bff" : "#ddd",
              color: isLogin ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              background: !isLogin ? "#007bff" : "#ddd",
              color: !isLogin ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: 10, padding: 8 }}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 10,
              border: "none",
              borderRadius: 6,
              background: "linear-gradient(to right, #007bff, #00d4ff)",
              color: "#fff",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
