import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectCase from "./pages/ProjectCase";
import PricingPage from "./pages/PricingPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import WhatsAppButton from "./components/WhatsAppButton";
import ProtectedRoute from "./components/ProtectedRoute";
import { LanguageProvider } from "./i18n/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import bg from "./assets/bg.png";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div
            className="fixed inset-0 -z-10 bg-[#080B2A] bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectCase />} />
            <Route path="/pricing/:slug" element={<PricingPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;