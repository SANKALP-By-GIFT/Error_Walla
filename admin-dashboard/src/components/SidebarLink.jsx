import React from "react";
import { NavLink } from "react-router-dom";

/*
═══════════════════════════════════════════════════════════════════════════
SIDEBARLINK COMPONENT - Reusable navigation link
═══════════════════════════════════════════════════════════════════════════

WHY REUSABILITY IMPROVES MAINTAINABILITY:
- Eliminates duplicate NavLink logic across sidebar items
- Centralized active link styling logic
- React.memo prevents re-renders when other sidebar items update
- Makes adding new navigation items extremely simple
- Easy to add icons, badges, or tooltips in future

WHY REACT.MEMO IS USED:
- Sidebar has multiple SidebarLink children
- Without memo, updating one link's active state could re-render all links
- With memo, only the clicked link re-renders (pure component optimization)
*/

const SidebarLink = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        // More specific class naming to ensure styles apply correctly
        return isActive ? "sidebar-link sidebar-link-active" : "sidebar-link";
      }}
      end={to === "/dashboard"}  // Only match exact path for dashboard
    >
      {label}
    </NavLink>
  );
};

export default React.memo(SidebarLink);
