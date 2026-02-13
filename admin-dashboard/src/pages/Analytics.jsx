import { useQuery } from "@tanstack/react-query";
import { fetchAnalytics } from "../api/analyticsApi";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import PageHeader from "../components/PageHeader";


/*
Analytics page with dynamic hover interaction.
*/

function Analytics() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  return (

    <div>

      <PageHeader
        title="Analytics Dashboard"
        subtitle="Detailed performance metrics"
      />


      <div className="dashboard-grid">

        <StatCard
          title="Total Users"
          value={data.totalUsers}
          description="Growth increasing steadily"
        />

        <StatCard
          title="Revenue"
          value={"₹" + data.revenue}
          description="Revenue showing positive trend"
        />

        <StatCard
          title="Subscriptions"
          value={data.subscriptions}
          description="Active subscriptions this month"
        />

        <StatCard
          title="Growth"
          value={data.growth + "%"}
          description="Monthly performance growth"
        />

      </div>

    </div>

  );

}

export default Analytics;
