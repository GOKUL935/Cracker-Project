// client/src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  // If not logged in → go to /auth
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children; // Logged in → allow access
}
