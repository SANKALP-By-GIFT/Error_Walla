import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchAnalytics } from "../api/analyticsApi";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import PageHeader from "../components/PageHeader";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/*
═══════════════════════════════════════════════════════════════════════════
ANALYTICS PAGE - Server State Management with React Query
═══════════════════════════════════════════════════════════════════════════

REACT QUERY BENEFITS:
- Automatic caching: Fetched data is cached, reducing API calls
- Stale state management: Knows when data is fresh vs stale
- Synchronization: Multiple components can share the same query
- Error handling: Built-in error and loading states
- DevTools: React Query DevTools available for debugging

CODE SPLITTING & LAZY LOADING:
- This component is lazily loaded using React.lazy() in routes.jsx
- Only downloads when user navigates to /dashboard/analytics
- Reduces initial bundle size significantly
- Suspense wrapper shows fallback UI while component loads

RECHARTS INTEGRATION:
- LineChart: Shows revenue trend over 4 months
- BarChart: Displays subscription growth by month
- PieChart: Revenue distribution by category (Premium/Enterprise/Basic)
- Animated: All charts have animation enabled (animationDuration: 800ms)
- Responsive: Charts adapt to container width

PERFORMANCE OPTIMIZATIONS:
- Memoized components (StatCard, PageHeader, Loader, ErrorMessage)
- React Query caches analytics data globally
- Reusable StatCard prevents re-rendering props changes
- useQuery hook memoizes fetch function automatically
*/

function Analytics() {
  // useQuery handles all server state: data, loading, error
  // Caches data with queryKey ["analytics"]
  // Refetches stale data automatically
  const { data, isLoading, isError } = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
    staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache kept for 10 minutes
  });

  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  // Color palette for charts
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div>
      <PageHeader
        title="Analytics Dashboard"
        subtitle="Real-time business performance metrics"
      />

      <div className="dashboard-grid">
        <StatCard
          title="Total Users"
          value={data.totalUsers}
          description="Total registered users in the system"
          onClick={() => navigate("/dashboard/users")}
        />

        <StatCard
          title="Revenue"
          value={"₹" + data.revenue.toLocaleString()}
          description="Total revenue generated this month"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        <StatCard
          title="Subscriptions"
          value={data.subscriptions}
          description="Active premium subscriptions"
          onClick={() => window.scrollTo({ top: 300, behavior: "smooth" })}
        />

        <StatCard
          title="Growth Rate"
          value={data.growth + "%"}
          description="Month-over-month growth percentage"
          onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
        />
      </div>

      {/* Charts Section */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: "#1f2937" }}>
          📊 Financial Analytics
        </h3>

        {/* Revenue Trend Chart */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}>
          <h4 style={{ marginBottom: "15px", color: "#374151" }}>Revenue Trend (Monthly)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5 }}
                activeDot={{ r: 7 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subscriptions Growth Chart */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}>
          <h4 style={{ marginBottom: "15px", color: "#374151" }}>Subscriptions Growth (Monthly)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthlyGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="subscriptions"
                fill="#10b981"
                animationDuration={800}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Category Chart */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}>
          <h4 style={{ marginBottom: "15px", color: "#374151" }}>Revenue Distribution by Category</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.revenueByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationDuration={800}
              >
                {data.revenueByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Details Breakdown */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: "#1f2937" }}>
          📈 Performance Metrics
        </h3>
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}>
          <div style={{ padding: "15px", background: "#f0f4f8", borderRadius: "8px" }}>
            <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "5px" }}>Daily Active Users</p>
            <p style={{ fontSize: "24px", fontWeight: "700", color: "#3b82f6" }}>{data.activeUsers?.daily}</p>
          </div>
          <div style={{ padding: "15px", background: "#f0f4f8", borderRadius: "8px" }}>
            <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "5px" }}>Weekly Active Users</p>
            <p style={{ fontSize: "24px", fontWeight: "700", color: "#10b981" }}>{data.activeUsers?.weekly}</p>
          </div>
          <div style={{ padding: "15px", background: "#f0f4f8", borderRadius: "8px" }}>
            <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "5px" }}>Conversion Rate</p>
            <p style={{ fontSize: "24px", fontWeight: "700", color: "#f59e0b" }}>{data.conversionRate}%</p>
          </div>
          <div style={{ padding: "15px", background: "#f0f4f8", borderRadius: "8px" }}>
            <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "5px" }}>Churn Rate</p>
            <p style={{ fontSize: "24px", fontWeight: "700", color: "#ef4444" }}>{data.churnRate}%</p>
          </div>
          <div style={{ padding: "15px", background: "#f0f4f8", borderRadius: "8px" }}>
            <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "5px" }}>Avg Session Duration</p>
            <p style={{ fontSize: "24px", fontWeight: "700", color: "#8b5cf6" }}>{data.averageSessionDuration} min</p>
          </div>
          <div style={{ padding: "15px", background: "#f0f4f8", borderRadius: "8px" }}>
            <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "5px" }}>Monthly Active Users</p>
            <p style={{ fontSize: "24px", fontWeight: "700", color: "#06b6d4" }}>{data.activeUsers?.monthly}</p>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      {data.topPages && data.topPages.length > 0 && (
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: "#1f2937" }}>
            🌐 Top Pages
          </h3>
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#374151" }}>Page</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#374151" }}>Views</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#374151" }}>Avg Time (sec)</th>
                </tr>
              </thead>
              <tbody>
                {data.topPages.map((page, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px", color: "#374151" }}>{page.name}</td>
                    <td style={{ padding: "12px", color: "#374151" }}>{page.views}</td>
                    <td style={{ padding: "12px", color: "#374151" }}>{page.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
