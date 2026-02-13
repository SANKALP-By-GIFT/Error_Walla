import { NavLink } from "react-router-dom";

/*
Reusable SidebarLink improves maintainability.
It prevents duplicate NavLink code.
*/

function SidebarLink({ to, label }) {

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "sidebar-link active" : "sidebar-link"
      }
    >
      {label}
    </NavLink>
  );
}

export default SidebarLink;
