import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
import DashboardLayout from "../pages/DashboardLayout";

import Analytics from "../pages/Analytics";
import Users from "../pages/Users";
import Settings from "../pages/Settings";

function DashboardHome() {
  return <h2>Dashboard Home</h2>;
}

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route index element={<DashboardHome />} />

          <Route path="analytics" element={<Analytics />} />

          <Route path="users" element={<Users />} />

          <Route path="settings" element={<Settings />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}
