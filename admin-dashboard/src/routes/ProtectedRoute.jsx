import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
ProtectedRoute prevents unauthorized users from accessing dashboard.
*/

function ProtectedRoute({ children }) {

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
