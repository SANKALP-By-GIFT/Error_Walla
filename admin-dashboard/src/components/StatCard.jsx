import { useState } from "react";
import React from "react";

/*
═══════════════════════════════════════════════════════════════════════════
STATCARD COMPONENT - REUSABLE METRICS DISPLAY
═══════════════════════════════════════════════════════════════════════════

WHY REUSABILITY IMPROVES MAINTAINABILITY:
- Single responsibility: Component only manages one card's logic
- DRY principle: Reduces code duplication across pages (Analytics, Dashboard)
- Consistency: Ensures uniform look across all metric displays
- Easy updates: Modify styling once, applies everywhere
- Testing: Isolated component testing is simpler

WHY REACT.MEMO IS USED:
- Prevents unnecessary re-renders when parent components update
- Only re-renders when props (title, value, description) change
- Improves performance in dashboards with many StatCards
- Critical for applications with frequent data polling
*/

const StatCard = ({ title, value, description, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="stat-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s ease",
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
      {hovered && (
        <p className="stat-description">{description}</p>
      )}
      {onClick && hovered && (
        <p style={{ fontSize: "12px", color: "#3b82f6", marginTop: "10px", fontWeight: "600" }}>
          Click to view details →
        </p>
      )}
    </div>
  );
};

export default React.memo(StatCard);
