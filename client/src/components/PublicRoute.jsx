import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../pages/auth";

function PublicRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/" /> : children;
}

export default PublicRoute;
