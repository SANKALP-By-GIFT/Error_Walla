import React from "react";

/*
PAGEHEADER COMPONENT - Reusable page title section

WHY REUSABILITY IMPROVES MAINTAINABILITY:
- All pages use consistent header styling
- Reduces code duplication (used in Analytics, Users, Settings, Dashboard)
- React.memo prevents re-renders of children on parent state changes
- Easy to add features (breadcrumbs, actions) in one place
*/

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      {subtitle && (
        <p className="page-subtitle">{subtitle}</p>
      )}
    </div>
  );
};

export default React.memo(PageHeader);
