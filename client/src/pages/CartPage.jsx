import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        🛒 Your Cart is Empty
      </h2>
    );
  }

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleProceed = () => {
    navigate("/checkout", {
      replace: true,   // optional: prevent backstack issue
      state: { cartItems, totalAmount }
    });
  };


  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "80px",
                height: "80px",
                marginRight: "20px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <div>
              <h4>{item.name}</h4>
              <p>
                {item.quantity || 1} × ₹{item.price} ={" "}
                <b>₹{(item.quantity || 1) * item.price}</b>
              </p>
            </div>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              padding: "8px 12px",
              backgroundColor: "#ff4d4f",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <h3 style={{ textAlign: "right", marginTop: "20px" }}>
        Total: ₹{totalAmount}
      </h3>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={handleProceed}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CartPage;
