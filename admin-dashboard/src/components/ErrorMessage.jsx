import React from "react";

/*
ERRORMESSAGE COMPONENT - Reusable error display

WHY REUSABILITY MATTERS:
- Consistent error handling across multiple pages
- Easy to implement retry logic in future
- React.memo prevents unnecessary re-renders
*/

const ErrorMessage = () => {
  return (
    <div style={{ 
      textAlign: "center", 
      padding: "20px", 
      color: "red",
      background: "#ffe0e0",
      borderRadius: "5px",
      margin: "20px 0"
    }}>
      <p>Error loading data</p>
    </div>
  );
};

export default React.memo(ErrorMessage);
