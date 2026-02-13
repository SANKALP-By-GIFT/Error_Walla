import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

function Sidebar() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">

      <h2>Admin Panel</h2>

      <nav>

        <NavLink to="/dashboard">Dashboard</NavLink>

        <NavLink to="/dashboard/analytics">Analytics</NavLink>

        <NavLink to="/dashboard/users">Users</NavLink>

        <NavLink to="/dashboard/settings">Settings</NavLink>

      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

// THIS LINE IS REQUIRED
export default React.memo(Sidebar);
