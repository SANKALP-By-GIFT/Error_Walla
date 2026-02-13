import { createContext, useContext, useState, useEffect } from "react";

/*
Context API is used to store authentication state globally.
This avoids prop drilling and allows any component to access auth state.
*/

const AuthContext = createContext();

export function AuthProvider({ children }) {

  // Store token in state
  const [token, setToken] = useState(null);

  // Load token from localStorage when app starts
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Login function
  const login = () => {
    const fakeToken = "mock-token-123";
    localStorage.setItem("token", fakeToken);
    setToken(fakeToken);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Check authentication
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
