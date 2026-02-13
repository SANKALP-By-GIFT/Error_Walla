import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/usersApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import UserRow from "../components/UserRow";
import PageHeader from "../components/PageHeader";

/*
═══════════════════════════════════════════════════════════════════════════
USERS PAGE - User Management with React Query
═══════════════════════════════════════════════════════════════════════════

SERVER STATE MANAGEMENT WITH REACT QUERY:
- useQuery automatically handles loading, error, and success states
- Data is cached and synced across the application
- Stale data is refetched when component mounts
- Multiple pages can share the same user data cache

PERFORMANCE OPTIMIZATIONS:
- Memoized UserRow component prevents unnecessary re-renders
- Each user row only depends on its own data (pure component)
- React Query caches users globally - subsequent visits are instant
- Lazy loading via React.lazy() ensures component code splits properly

TABLE RENDERING WITH REUSABLE COMPONENTS:
- UserRow is a memoized component - prevents full list re-render
- Props are destructured (name, email, status) - prevents passing whole object
- Key prop ensures proper React reconciliation
- Easy to add features like edit/delete buttons to UserRow

CODE SPLITTING:
- This page is lazy loaded with React.lazy()
- Only downloads when navigating to /dashboard/users
- Wrapped in Suspense with fallback UI
*/

function Users() {
  // useQuery manages asynchronous user data fetching
  // Automatically handles: loading, error, retry logic, caching
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache kept for 10 minutes
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="table-container">
      <PageHeader
        title="Users Management"
        subtitle="View and manage all registered users"
      />

      <table style={{
        width: "100%",
        background: "white",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <thead style={{ background: "#1e293b", color: "white" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {data && data.map(user => (
            <UserRow 
              key={user.id} 
              name={user.name}
              email={user.email}
              status={user.status}
            />
          ))}
        </tbody>
      </table>

      {/* Total Users Count */}
      <div style={{ marginTop: "20px", textAlign: "right", color: "#666" }}>
        <p>Total Users: <strong>{data?.length || 0}</strong></p>
      </div>
    </div>
  );
}

export default Users;
