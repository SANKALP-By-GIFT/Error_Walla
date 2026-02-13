import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SidebarLink from "./SidebarLink";
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
        <SidebarLink to="/dashboard" label="Dashboard" />
        <SidebarLink to="/dashboard/analytics" label="Analytics" />
        <SidebarLink to="/dashboard/users" label="Users" />
        <SidebarLink to="/dashboard/settings" label="Settings" />
      </nav>


      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default React.memo(Sidebar);
