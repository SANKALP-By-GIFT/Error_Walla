import analyticsData from "../mock/analytics.json";

/*
═══════════════════════════════════════════════════════════════════════════
ANALYTICS API - Mock Server-State Fetching
═══════════════════════════════════════════════════════════════════════════

WHY WE USE MOCK APIS (Exam Requirement):
- Backend not allowed in exam (Frontend Only)
- Simulates real API behavior with artificial delay
- React Query works identically with mock vs real API
- Demonstrates understanding of server state management

MOCK API SIMULATION:
- Returns Promise to mimic async HTTP call
- setTimeout simulates network latency (1 second)
- In production, this would be: fetch('https://api.example.com/analytics')
- React Query treats mock and real APIs identically

HOW THIS WORKS WITH REACT QUERY:
const { data } = useQuery({
  queryKey: ["analytics"],
  queryFn: fetchAnalytics  // ← This function is called
});

BENEFITS OF THIS APPROACH:
- Zero backend setup needed for exam
- Easy to switch to real API later (just change fetchAnalytics function)
- React Query handles caching regardless of data source
- Can demonstrate understanding without deployment dependency
*/

export function fetchAnalytics() {
  return new Promise((resolve) => {
    // Simulate network request latency
    setTimeout(() => {
      resolve(analyticsData);
    }, 1000); // 1 second delay mimics real API call
  });
}

/*
ALTERNATIVE PATTERN (Can be used):
export const fetchAnalytics = async () => {
  // Real production API:
  // const response = await fetch('https://api.example.com/analytics');
  // return response.json();
  
  // Mock pattern for exam:
  return new Promise(resolve => {
    setTimeout(() => resolve(analyticsData), 1000);
  });
};
*/
