/*
Reusable component improves maintainability.
This row component can be reused anywhere.
*/

function UserRow({ user }) {

  return (
    <tr>

      <td>{user.name}</td>

      <td>{user.email}</td>

      <td>
        <span style={{
          color: user.status === "Active" ? "green" : "red",
          fontWeight: "bold"
        }}>
          {user.status}
        </span>
      </td>

    </tr>
  );
}

export default UserRow;
