import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SidebarLink from "./SidebarLink";
import React from "react";

/*
Sidebar component provides navigation across dashboard.
React.memo prevents unnecessary re-rendering.
This improves performance.
*/

function Sidebar() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <aside className="sidebar">

      {/* Logo / Title */}
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
        <p className="sidebar-subtitle">Management System</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <SidebarLink
          to="/dashboard"
          label="Dashboard"
        />

        <SidebarLink
          to="/dashboard/analytics"
          label="Analytics"
        />

        <SidebarLink
          to="/dashboard/users"
          label="Users"
        />

        <SidebarLink
          to="/dashboard/settings"
          label="Settings"
        />

      </nav>

      {/* Logout */}
      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </aside>

  );
}

export default React.memo(Sidebar);
