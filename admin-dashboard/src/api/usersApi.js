import users from "../mock/users.json";

/*
Simulates backend API call using Promise.
React Query will fetch this data.
*/

export function fetchUsers() {

  return new Promise((resolve) => {

    setTimeout(() => {

      resolve(users);

    }, 1000);

  });

}
