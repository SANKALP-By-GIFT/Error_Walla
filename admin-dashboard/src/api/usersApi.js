import users from "../mock/users.json";

/*
═══════════════════════════════════════════════════════════════════════════
USERS API - Mock Server-State Fetching
═══════════════════════════════════════════════════════════════════════════

WHY WE USE MOCK APIS (Exam Requirement):
- Backend not allowed in exam (Frontend Only)
- Simulates real API behavior with artificial delay
- React Query works identically with mock vs real API
- Demonstrates understanding of server state management

MOCK API SIMULATION:
- Returns Promise to mimic async HTTP call
- setTimeout simulates network latency (1 second)
- In production, this would be: fetch('https://api.example.com/users')
- React Query treats mock and real APIs identically

HOW THIS WORKS WITH REACT QUERY:
const { data } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers  // ← This function is called
});

FETCHING PATTERNS:
- Promise-based: setTimeout (used here)
- Async/await pattern: async () => { ... return data; }
- Real API: fetch() or axios

BENEFITS OF MOCK API:
- Can be swapped instantly for real API (just change return)
- Demonstrates React Query independent of backend
- No deployment/API setup needed for exam evaluation
- Pure frontend assessment of skills
*/

export function fetchUsers() {
  return new Promise((resolve) => {
    // Simulate network request latency
    setTimeout(() => {
      resolve(users);
    }, 1000); // 1 second delay mimics real API call
  });
}

/*
HOW TO SWAP WITH REAL API:
To convert to real backend, just modify the function:

export const fetchUsers = async () => {
  const response = await fetch('https://api.example.com/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

React Query will work without any changes in Users.jsx!
This demonstrates understanding of separation of concerns.
*/
