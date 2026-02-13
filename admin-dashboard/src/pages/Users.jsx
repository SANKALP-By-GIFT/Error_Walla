import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "../api/usersApi";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import UserRow from "../components/UserRow";
import PageHeader from "../components/PageHeader";


/*
Users page fetches data using React Query.
Displays users in table format.
*/

function Users() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  });

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMessage />;

  return (

    <div className="table-container">

      <PageHeader
        title="Users Management"
        subtitle="Manage all registered users"
      />


      <table style={{
        width: "100%",
        background: "white",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop: "20px"
      }}>

        <thead style={{ background: "#1e293b", color: "white" }}>

          <tr>

            <th style={{ padding: "10px" }}>Name</th>

            <th style={{ padding: "10px" }}>Email</th>

            <th style={{ padding: "10px" }}>Status</th>

          </tr>

        </thead>

        <tbody>

          {data.map(user => (
            <UserRow key={user.id} user={user} />
          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Users;
