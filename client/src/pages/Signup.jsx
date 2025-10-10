import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("srv-d3jb5svdiees73cdgecg/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required /><br/>
      <input name="email" placeholder="Email" onChange={handleChange} required /><br/>
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br/>
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
