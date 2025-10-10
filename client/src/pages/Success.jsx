import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      fetch(`https://crackzie-backend.onrender.com/v1/checkout/session/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSession(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Error fetching session:", err);
          setLoading(false);
        });
    }
  }, [searchParams]);

  if (loading) return <p>Loading...</p>;
  if (!session) return <p>Session not found ❌</p>;

  const customer = session.customer_details;
  const address = customer?.address || {};

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ color: "green" }}>✅ Payment Successful!</h2>

      <h3>Invoice</h3>
      <p><strong>Session ID:</strong> {session.id}</p>
      <p><strong>Total Paid:</strong> ₹{session.amount_total / 100}</p>

      <h3>Customer</h3>
      <p><strong>Name:</strong> {customer?.name}</p>
      <p><strong>Email:</strong> {customer?.email}</p>
      <p><strong>Phone:</strong> {customer?.phone}</p>

      <h3>Address</h3>
      <p>
        {address.line1}, {address.city}, {address.state},{" "}
        {address.postal_code}, {address.country}
      </p>
    </div>
  );
}

export default Success;
