import StatCard from "../components/StatCard";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";

/*
═══════════════════════════════════════════════════════════════════════════
DASHBOARD HOME PAGE - Main Dashboard Entry Point
═══════════════════════════════════════════════════════════════════════════

NESTED ROUTING STRUCTURE:
- DashboardLayout wraps all dashboard pages
- Uses React Router Outlet to render child routes
- /dashboard → This DashboardHome component
- /dashboard/analytics → Analytics lazy loaded page
- /dashboard/users → Users lazy loaded page
- /dashboard/settings → Settings lazy loaded page

COMPONENT COMPOSITION:
- Uses memoized reusable components: StatCard, PageHeader
- StatCard displays KPIs with hover descriptions
- PageHeader provides consistent page titles
- Each component is independently testable

CLICKABLE STAT CARDS:
- Each stat card has onClick handler that navigates to detail page
- StatCard component passes cursor:pointer when onClick provided
- Shows "Click to view details →" hint on hover
- Navigation uses useNavigate() hook from React Router

WHY THIS ARCHITECTURE:
- Sidebar navigation persists across all dashboard pages
- Layout wraps content - no duplicate layout code
- Nested routing matches real app structure
- Easy to add new dashboard pages without touching routing logic
*/

function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome back! Here's your performance summary today."
      />

      {/* KPI Cards - Reusable StatCard Components */}
      <div className="dashboard-grid">
        <StatCard
          title="Total Users"
          value="1250"
          description="Total registered users in system"
          onClick={() => navigate("/dashboard/users")}
        />

        <StatCard
          title="Revenue"
          value="₹54,000"
          description="Revenue generated this month"
          onClick={() => navigate("/dashboard/analytics")}
        />

        <StatCard
          title="Active Sessions"
          value="245"
          description="Users currently online"
          onClick={() => navigate("/dashboard/analytics")}
        />

        <StatCard
          title="Subscriptions"
          value="320"
          description="Active premium subscriptions"
          onClick={() => navigate("/dashboard/analytics")}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="dashboard-section" style={{
        background: "white",
        padding: "20px",
        marginTop: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h2>Recent Activity Log</h2>

        <ul className="activity-list" style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            📝 New user registered: Rahul Sharma
          </li>
          <li style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            💰 Payment received: ₹1200 from subscription renewal
          </li>
          <li style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            ✅ New subscription activated: Premium Plan
          </li>
          <li style={{ padding: "10px 0" }}>
            🔄 System update completed successfully
          </li>
        </ul>
      </div>

      {/* System Status Section */}
      <div className="dashboard-section" style={{
        background: "white",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h2>System Status</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
          <div>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Server Status</p>
            <p style={{ margin: "5px 0", fontSize: "18px", fontWeight: "bold", color: "#22c55e" }}>✓ Online</p>
          </div>
          <div>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Database Status</p>
            <p style={{ margin: "5px 0", fontSize: "18px", fontWeight: "bold", color: "#22c55e" }}>✓ Connected</p>
          </div>
          <div>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Last Backup</p>
            <p style={{ margin: "5px 0", fontSize: "18px", fontWeight: "bold" }}>Today at 02:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
