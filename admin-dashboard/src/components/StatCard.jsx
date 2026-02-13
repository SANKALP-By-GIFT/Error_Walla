import { useState } from "react";

/*
StatCard is reusable and interactive.
Hover effect improves UX and makes dashboard premium.
*/

function StatCard({ title, value, description }) {

  const [hovered, setHovered] = useState(false);

  return (

    <div
      className="stat-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <h4>{title}</h4>

      <h2>{value}</h2>

      {/* Show description only on hover */}
      {hovered && (
        <p className="stat-description">
          {description}
        </p>
      )}

    </div>

  );
}

export default StatCard;
