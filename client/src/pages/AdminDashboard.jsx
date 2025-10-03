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
    <div className="container py-4">
      <h2 className="fw-bold text-center mb-4">📦 Admin Dashboard</h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders found ❌</p>
      ) : (
        <div className="row g-4">
          {orders.map((o) => (
            <div key={o._id} className="col-md-6 col-lg-4">
              <div
                className="card shadow-sm h-100"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body">
                  {/* Customer Info */}
                  <h5 className="card-title fw-bold mb-1">{o.customerName}</h5>
                  <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
                    {o.customerEmail}
                  </p>
                  <span className="badge bg-info text-dark mb-3">
                    📞 {o.customerPhone}
                  </span>

                  {/* Address */}
                  <p style={{ fontSize: "14px" }}>
                    <strong>📍 Address:</strong>{" "}
                    {o.customerAddress?.line1}, {o.customerAddress?.city},{" "}
                    {o.customerAddress?.state} -{" "}
                    {o.customerAddress?.postal_code},{" "}
                    {o.customerAddress?.country}
                  </p>

                  {/* Products */}
                  <div className="mb-3">
                    <strong>🛒 Products:</strong>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {Array.isArray(o.items) &&
                        o.items.map((p, i) => (
                          <span
                            key={i}
                            className="badge bg-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {p.name} (x{p.quantity})
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Total */}
                  <p className="fw-bold text-success fs-5 mb-2">
                    💰 ₹{o.totalAmount}
                  </p>

                  {/* Session + Date */}
                  <p
                    className="text-muted"
                    style={{ fontSize: "12px", wordBreak: "break-word" }}
                  >
                    <strong>Session:</strong> {o.stripeSessionId}
                  </p>
                  <p className="text-muted" style={{ fontSize: "12px" }}>
                    {new Date(o.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
