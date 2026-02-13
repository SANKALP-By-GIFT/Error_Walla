import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SidebarLink from "./SidebarLink";
import React from "react";

/*
═══════════════════════════════════════════════════════════════════════════
SIDEBAR COMPONENT - Main Navigation Layout
═══════════════════════════════════════════════════════════════════════════

WHY SIDEBAR NEEDS MEMOIZATION:
- Sidebar is a parent component with many SidebarLink children
- When any page rerenders, the parent Dashboard could re-execute render
- React.memo prevents Sidebar re-render when auth state changes elsewhere
- Each memoized SidebarLink also prevents unnecessary child re-renders
- This creates a performance optimization cascade

HOW MEMOIZATION WORKS HERE:
1. Parent Dashboard renders → Sidebar memoized, doesn't re-render unless props change
2. User clicks a link → only that SidebarLink re-renders (also memoized)
3. Analytics page fetches data → Sidebar unaffected, stays rendered

RESULT: Better performance with multiple nested components
*/

const Sidebar = () => {
  const { logout, loginTime, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  return (
    <aside className="sidebar">
      {/* Logo / Title - Clickable */}
      <div className="sidebar-header" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <h2>📊 Admin Panel</h2>
        <p className="sidebar-subtitle">Management System</p>
      </div>

      {/* Navigation Routes */}
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

      {/* Logout Action */}
      <div className="sidebar-footer">
        {user && (
          <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f0f4f8", borderRadius: "6px", fontSize: "12px", color: "#666" }}>
            <p style={{ margin: "5px 0", fontWeight: "600" }}>👤 {user.username}</p>
            {loginTime && (
              <p style={{ margin: "5px 0", fontSize: "11px" }}>🕐 {loginTime}</p>
            )}
          </div>
        )}
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
