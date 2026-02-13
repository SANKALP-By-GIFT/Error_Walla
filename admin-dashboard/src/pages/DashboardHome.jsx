import StatCard from "../components/StatCard";

function DashboardHome() {

  return (
    <div>

      <h1>Welcome to Admin Dashboard</h1>

      <p>Overview of your system</p>

      <div className="card-container">

        <StatCard title="Total Users" value="1250" />

        <StatCard title="Revenue" value="₹54000" />

        <StatCard title="Active Sessions" value="245" />

        <StatCard title="System Health" value="Good" />

      </div>

    </div>
  );
}

export default DashboardHome;
