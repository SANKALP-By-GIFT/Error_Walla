import analyticsData from "../mock/analytics.json";

/*
This simulates API call using Promise.
React Query will fetch this data.
*/

export function fetchAnalytics() {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      resolve(analyticsData);

    }, 1000);

  });

}
