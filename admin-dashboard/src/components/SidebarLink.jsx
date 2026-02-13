import { NavLink } from "react-router-dom";

function SidebarLink({ to, label }) {
  return (
    <NavLink to={to}>
      {label}
    </NavLink>
  );
}

export default SidebarLink;
