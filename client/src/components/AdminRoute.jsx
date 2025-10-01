// client/src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  const unlocked =
    typeof window !== "undefined" &&
    sessionStorage.getItem("admin_unlocked") === "true";

  if (!unlocked) {
    return <Navigate to="/choose-role" replace />;
  }

  return children; // ✅ Admin only
}
