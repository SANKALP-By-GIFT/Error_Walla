import React from "react";

/*
═══════════════════════════════════════════════════════════════════════════
USERROW COMPONENT - Reusable table row for user display
═══════════════════════════════════════════════════════════════════════════

WHY REUSABILITY IMPROVES MAINTAINABILITY:
- Centralizes user row rendering logic
- Makes table formatting consistent across the app
- React.memo prevents re-renders when user list updates
- Easy to add features (edit, delete buttons) in one place

WHY REACT.MEMO IS USED:
- Users table renders many rows (10+ items)
- Without memo, adding a new user would re-render the entire list
- With memo, only the new row renders
- Critical for performance with large datasets
*/

const UserRow = ({ name, email, status }) => {
  return (
    <tr>
      <td style={{ padding: "10px" }}>{name}</td>
      <td style={{ padding: "10px" }}>{email}</td>
      <td style={{ padding: "10px" }}>
        <span style={{
          padding: "5px 10px",
          borderRadius: "5px",
          background: status === "Active" ? "#d1fae5" : "#fee2e2",
          color: status === "Active" ? "#047857" : "#dc2626",
          fontWeight: "500"
        }}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default React.memo(UserRow);
