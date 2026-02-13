import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import DashboardLayout from "../pages/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import ProtectedRoute from "../routes/ProtectedRoute";

/*
React.lazy improves performance by loading components only when needed.
This reduces initial bundle size.
*/

const Analytics = lazy(() => import("../pages/Analytics"));
const Users = lazy(() => import("../pages/Users"));
const Settings = lazy(() => import("../pages/Settings"));

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Suspense fallback={<div>Loading page...</div>}>

        <Routes>

          <Route path="/" element={<Navigate to="/login" />} />

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

      </Suspense>

    </BrowserRouter>

  );

}
