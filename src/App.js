import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import Home from "@/pages/Home";
import SignUp from "@/pages/auth/SignUp";
import SignIn from "@/pages/auth/SignIn";
import Features from "./pages/Features";
import Download from "./pages/Download";
import Premium from "./pages/Premium";
import Resources from "./pages/Resources";
import ProductivityGuideline from "./pages/ProductivityGuideline";
import AdminHome from "@/admin/AdminHome";
import AdvocateHome from "@/advocate/AdvocateHome";
import ClientHome from "@/client/ClientHome";
import ParalegalHome from "@/b_paralegal/ParalegalHome";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route path="/features" element={<Features />} />
          <Route path="/download" element={<Download />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/productivity-guideline" element={<ProductivityGuideline />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/advocate"
            element={
              <ProtectedRoute allowedRoles={['advocate']}>
                <AdvocateHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paralegal"
            element={
              <ProtectedRoute allowedRoles={['paralegal']}>
                <ParalegalHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;
