import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
═══════════════════════════════════════════════════════════════════════════
PROTECTED ROUTE COMPONENT - Route Authentication Guard
═══════════════════════════════════════════════════════════════════════════

PURPOSE:
- Prevents unauthorized users from accessing dashboard pages
- Guards against direct URL access to /dashboard without login
- Redirects unauthenticated users to /login

HOW IT WORKS:
1. Checks isAuthenticated from AuthContext
2. If false → Redirects to /login
3. If true → Renders child component (dashboard pages)

IMPLEMENTATION:
Used in routes.jsx:
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>

SECURITY PATTERN:
- This is "client-side" route protection
- Useful for UX (prevents showing protected pages to logged-out users)
- Not true security (can be bypassed by devtools)
- Real apps need server-side auth validation
- Server should verify token on every API request

EXAMPLE FLOW:
1. User not logged in
2. Types /dashboard in URL
3. ProtectedRoute checks isAuthenticated = false
4. Navigate redirects to /login
5. User sees login form

Another example:
1. User logged in
2. Types /dashboard  
3. ProtectedRoute checks isAuthenticated = true
4. DashboardLayout renders
5. User sees dashboard
*/

function ProtectedRoute({ children }) {

  const { isAuthenticated, isLoading } = useAuth();

  // Wait for session restoration before checking authentication
  if (isLoading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "18px", color: "#666" }}>
      Loading session...
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
