import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import DashboardLayout from "../pages/DashboardLayout";
import Analytics from "../pages/Analytics";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import DashboardHome from "../pages/DashboardHome";

import ProtectedRoute from "../routes/ProtectedRoute";

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
