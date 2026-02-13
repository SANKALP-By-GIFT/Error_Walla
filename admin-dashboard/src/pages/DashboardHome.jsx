import StatCard from "../components/StatCard";
import PageHeader from "../components/PageHeader";


function DashboardHome() {

  return (

    <div>

      {/* Header */}

      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome back! Here's what's happening today."
      />


      {/* Stat cards */}

      <div className="dashboard-grid">

        <StatCard
          title="Total Users"
          value="1250"
          description="Total registered users"
        />

        <StatCard
          title="Revenue"
          value="₹54,000"
          description="Total revenue generated"
        />

        <StatCard
          title="Active Sessions"
          value="245"
          description="Users currently active"
        />

        <StatCard
          title="Subscriptions"
          value="780"
          description="Active premium subscriptions"
        />

      </div>

      {/* Recent Activity */}

      <div className="dashboard-section">

        <h2>Recent Activity</h2>

        <ul className="activity-list">

          <li>New user registered: Rahul Sharma</li>

          <li>Payment received: ₹1200</li>

          <li>New subscription activated</li>

          <li>System update completed successfully</li>

        </ul>

      </div>

      {/* System Info */}

      <div className="dashboard-section">

        <h2>System Information</h2>

        <p>Server Status: Online</p>

        <p>Database Status: Connected</p>

        <p>Last Backup: Today at 02:00 AM</p>

      </div>

    </div>

  );

}

export default DashboardHome;
