import { useQuery } from "@tanstack/react-query";

import { fetchAnalytics } from "../api/analyticsApi";

import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

/*
React Query is used for server-state fetching.
It provides loading, error, and caching automatically.
*/

function Analytics() {

  const { data, isLoading, isError } = useQuery({

    queryKey: ["analytics"],

    queryFn: fetchAnalytics

  });

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMessage />;

  if (!data) return <p>No data available</p>;

  return (

    <div>

      <h2>Analytics Dashboard</h2>

      <div className="card-container">

        <StatCard
          title="Total Users"
          value={data.totalUsers}
        />

        <StatCard
          title="Revenue"
          value={"₹" + data.revenue}
        />

        <StatCard
          title="Subscriptions"
          value={data.subscriptions}
        />

        <StatCard
          title="Growth"
          value={data.growth + "%"}
        />

      </div>

    </div>

  );

}

export default Analytics;
