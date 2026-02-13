import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

/*
═══════════════════════════════════════════════════════════════════════════
AUTHENTICATION CONTEXT - Global Auth State Management
═══════════════════════════════════════════════════════════════════════════

WHY USE CONTEXT API:
- Avoids prop drilling (passing auth state through many components)
- Centralizes authentication logic
- Makes login/logout accessible anywhere using useAuth() hook
- Prevents authentication state in every component

HOW IT WORKS:
1. AuthProvider wraps entire app (in main.jsx)
2. Provides user, login, logout, signup functions globally
3. useAuth() hook accesses context from any component
4. ProtectedRoute uses isAuthenticated to control access

AUTHENTICATION FLOW:
1. User visits /login
2. Enters credentials → login() function called
3. Credentials verified against localStorage users
4. If valid → token stored, user state set, redirect to /dashboard
5. If invalid → error message shown
6. ProtectedRoute checks isAuthenticated before rendering

TOKEN SIMULATION (Mock):
- Real app: Would return JWT token from backend
- This app: Uses user object as "token"
- localStorage stores auth state (mock persistent login)
- On refresh, checks localStorage to restore session

SECURITY NOTE:
This is a learning project. Real apps must:
- Use secure HTTP-only cookies for tokens
- Hash passwords on backend (never store plain text)
- Validate tokens server-side on every request
- Use HTTPS for all auth communication
*/

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loginTime, setLoginTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user session from localStorage on app load
  useEffect(() => {

    const savedUser = localStorage.getItem("loggedUser");
    const savedLoginTime = localStorage.getItem("loginTime");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      if (savedLoginTime) {
        setLoginTime(savedLoginTime);
      }
    }

    // Session restoration complete
    setIsLoading(false);

  }, []);

  // Signup function - creates new user account
  const signup = (username, email, password) => {

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === email);

    if (exists) {
      return { success: false, message: "User already exists" };
    }

    const newUser = { username, email, password };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  };

  // Login function - verifies credentials and sets session
  const login = (email, password) => {

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      u => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, message: "Invalid credentials" };
    }

    // Store login time with real timestamp
    const now = new Date().toLocaleString();
    setLoginTime(now);

    localStorage.setItem("loggedUser", JSON.stringify(found));
    localStorage.setItem("loginTime", now);

    setUser(found);

    return { success: true };
  };

  // Logout function - clears session
  const logout = () => {

    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loginTime");

    setUser(null);
    setLoginTime(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      loginTime,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth context
// Usage: const { user, logout, isAuthenticated } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
