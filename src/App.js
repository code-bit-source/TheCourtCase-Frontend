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
import About from "./pages/About";
import FAQ from "./pages/F&Q";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Press from "./pages/Press";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import Guide from "./pages/Guide";
import Templates from "./pages/Templates";
import Blog from "./pages/Blog";
import HelpCenter from "./pages/HelpCenter";
import Enterprise from "./pages/Enterprise";
import AdminHome from "@/admin/AdminHome";
import AdvocateHome from "@/advocate/AdvocateHome";
import ClientHome from "@/client/ClientHome";
import ParalegalHome from "@/b_paralegal/ParalegalHome";
import Dashboard from "@/advocate/Dashboard";
import MattersPage from "@/advocate/MattersPage";
import TasksPage from "@/advocate/TasksPage";
import CalendarPage from "@/advocate/CalendarPage";
import CaseSummaryPageReact from "@/advocate/CaseSummaryPageReact";
import DocumentsPage from "@/advocate/DocumentsPage";
import MessagesPageReact from "@/advocate/MessagesPageReact";
import BillingPageReact from "@/advocate/BillingPageReact";
import AppIntegrationsPageReact from "@/advocate/AppIntegrationsPageReact";
import Timeline from "@/advocate/Timeline";
import AdvocateSettings from "@/advocate/AdvocateSettings";
import ConnectionsPage from "@/advocate/ConnectionsPage";

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
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/productivity-guideline" element={<ProductivityGuideline />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/press" element={<Press />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/security" element={<Security />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route path="/client-home" element={<ClientHome />} />
          <Route
            path="/client"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientHome />
              </ProtectedRoute>
            }
          />
          <Route path="/paralegal-home" element={<ParalegalHome />} />
          <Route
            path="/paralegal"
            element={
              <ProtectedRoute allowedRoles={['paralegal']}>
                <ParalegalHome />
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
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="matters" element={<MattersPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="case-summary" element={<CaseSummaryPageReact />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="connections" element={<ConnectionsPage />} />
            <Route path="billing" element={<BillingPageReact />} />
            <Route path="messages" element={<MessagesPageReact />} />
            <Route path="app-integrations" element={<AppIntegrationsPageReact />} />
            <Route path="settings" element={<AdvocateSettings />} />
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;
