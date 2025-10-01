import { useEffect, useState } from "react";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:4000/api/admin/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Admin fetch error:", err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📦 Admin Dashboard</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Products Ordered</th>
              <th>Total Bill</th>
              <th>Session ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.userId}</td>
                <td>{o.customerName}</td>
                <td>{o.customerEmail}</td>
                <td>{o.customerPhone}</td>
                <td>
                  {o.customerAddress?.line1}, {o.customerAddress?.city},{" "}
                  {o.customerAddress?.postal_code}
                </td>
                <td>
                  {Array.isArray(o.items) &&
                    o.items.map((p, i) => (
                      <div key={i}>
                        {p.name} (x{p.quantity}) – ₹{p.price}
                      </div>
                    ))}
                </td>
                <td>₹{o.totalAmount}</td>
                <td style={{ fontSize: "12px" }}>{o.stripeSessionId}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
