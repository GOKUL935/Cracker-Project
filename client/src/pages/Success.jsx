// client/src/pages/Success.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [searchParams] = useSearchParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      fetch(`http://localhost:4000/v1/checkout/session/${sessionId}`)
        .then((res) => res.json())
        .then(async (data) => {
          setSession(data);

          // ✅ Save order to backend
          try {
            await fetch("http://localhost:4000/api/admin/save-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                stripeSessionId: data.id,
                customerName: data.customer_details?.name,
                customerEmail: data.customer_details?.email,
                customerPhone: data.customer_details?.phone,
                customerAddress: data.customer_details?.address,
                items: data.line_items?.data.map((item) => ({
                  name: item.description,
                  quantity: item.quantity,
                  price: item.amount_total / 100,
                })),
                totalAmount: data.amount_total / 100,
              }),
            });
          } catch (err) {
            console.error("❌ Order save error:", err);
          }
        })
        .catch((err) => console.error("❌ Error fetching session:", err));
    }
  }, [searchParams]);

  if (!session) return <p>Loading payment details...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2>✅ Payment Successful!</h2>
      <h3>Invoice</h3>

      <p><b>Session ID:</b> {session.id}</p>
      <p><b>Total Paid:</b> ₹{session.amount_total / 100}</p>

      <h4>Customer</h4>
      <p><b>Name:</b> {session.customer_details?.name}</p>
      <p><b>Email:</b> {session.customer_details?.email}</p>
      <p><b>Phone:</b> {session.customer_details?.phone}</p>
    </div>
  );
}

export default Success;
