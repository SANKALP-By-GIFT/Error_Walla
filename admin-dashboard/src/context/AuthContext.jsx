import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

/*
AuthContext manages authentication globally.
Stores users and token using localStorage.
*/

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  // Load logged-in user
  useEffect(() => {

    const savedUser = localStorage.getItem("loggedUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

  }, []);

  // Signup function
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

  // Login function
  const login = (email, password) => {

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      u => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, message: "Invalid credentials" };
    }

    localStorage.setItem("loggedUser", JSON.stringify(found));

    setUser(found);

    return { success: true };
  };

  // Logout
  const logout = () => {

    localStorage.removeItem("loggedUser");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
