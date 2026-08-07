import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import WriterLogin from "./pages/WriterLogin";
import WriterForgotPassword from "./pages/WriterForgotPassword";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import WriterDashboard from "./pages/writer/WriterDashboard";
import ServicesPage from "./pages/marketing/Services";
import ProcessPage from "./pages/marketing/Process";
import WritersPage from "./pages/marketing/Writers";
import PricingPage from "./pages/marketing/Pricing";
import FAQPage from "./pages/marketing/FAQ";
import Privacy from "./pages/marketing/Privacy";
import Terms from "./pages/marketing/Terms";
import BlogsPage from "./pages/marketing/Blogs";
import SamplesPage, { SampleDetailPage } from "./pages/marketing/Samples";
import AboutPage from "./pages/marketing/About";
import ContactPage from "./pages/marketing/Contact";
import NotFoundPage from "./pages/marketing/NotFound";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/writers" element={<WritersPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/samples" element={<SamplesPage />} />
          <Route path="/samples/:id" element={<SampleDetailPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/writer-login" element={<WriterLogin />} />
          <Route path="/writer-forgot-password" element={<WriterForgotPassword />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/writer" element={<WriterDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
