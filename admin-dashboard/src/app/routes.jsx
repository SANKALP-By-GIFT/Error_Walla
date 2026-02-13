import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import Login from "../pages/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
import DashboardLayout from "../pages/DashboardLayout";

/*
React.lazy → Code Splitting
Pages load only when user visits them.
This improves performance and reduces initial bundle size.
*/
const Analytics = lazy(() => import("../pages/Analytics"));
const Users = lazy(() => import("../pages/Users"));
const Settings = lazy(() => import("../pages/Settings"));

function DashboardHome() {
  return <h2>Dashboard Home</h2>;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>

      {/* Suspense shows fallback while lazy pages load */}
      <Suspense fallback={<h2>Loading page...</h2>}>
        <Routes>

          {/* Default route → redirect to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Nested routes using Outlet */}
            <Route index element={<DashboardHome />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
      </Suspense>

    </BrowserRouter>
  );
}
