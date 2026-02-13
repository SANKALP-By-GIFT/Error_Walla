import React from "react";

/*
LOADER COMPONENT - Reusable loading indicator

WHY REUSABILITY MATTERS:
- Consistent loading experience across all async operations
- Easy to upgrade design (skeleton loader, spinner, etc.)
- React.memo prevents re-renders during parent state changes
*/

const Loader = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <p>Loading...</p>
    </div>
  );
};

export default React.memo(Loader);
