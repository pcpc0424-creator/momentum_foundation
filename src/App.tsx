import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Business from "./pages/Business";
import News from "./pages/News";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// About sub-pages
import CompanyIntro from "./pages/about/CompanyIntro";
import CEOMessage from "./pages/about/CEOMessage";
import Philosophy from "./pages/about/Philosophy";
import History from "./pages/about/History";
import Organization from "./pages/about/Organization";

// Business sub-pages
import FoodBusiness from "./pages/business/FoodBusiness";
import FranchiseBusiness from "./pages/business/FranchiseBusiness";
import FMBusiness from "./pages/business/FMBusiness";
import CosmeticsBusiness from "./pages/business/CosmeticsBusiness";

// News sub-pages
import Notice from "./pages/news/Notice";
import CompanyNews from "./pages/news/CompanyNews";

// Careers sub-pages
import JobPostings from "./pages/careers/JobPostings";
import Culture from "./pages/careers/Culture";
import Process from "./pages/careers/Process";
import JobApplication from "./pages/careers/JobApplication";

// Contact sub-pages
import Inquiry from "./pages/contact/Inquiry";
import Location from "./pages/contact/Location";
import Departments from "./pages/contact/Departments";

// Admin page
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

// ScrollToTop component
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

const App = () => (
<QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/business" element={<Business />} />
          <Route path="/news" element={<News />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* About sub-pages */}
          <Route path="/about/intro" element={<CompanyIntro />} />
          <Route path="/about/ceo" element={<CEOMessage />} />
          <Route path="/about/philosophy" element={<Philosophy />} />
          <Route path="/about/history" element={<History />} />
          <Route path="/about/organization" element={<Organization />} />
          
          {/* Business sub-pages */}
          <Route path="/business/food" element={<FoodBusiness />} />
          <Route path="/business/franchise" element={<FranchiseBusiness />} />
          <Route path="/business/fm" element={<FMBusiness />} />
          <Route path="/business/cosmetics" element={<CosmeticsBusiness />} />
          
          {/* News sub-pages */}
          <Route path="/news/notice" element={<Notice />} />
          <Route path="/news/company" element={<CompanyNews />} />
          
          {/* Careers sub-pages */}
          <Route path="/careers/jobs" element={<JobPostings />} />
          <Route path="/careers/culture" element={<Culture />} />
          <Route path="/careers/process" element={<Process />} />
          <Route path="/careers/application" element={<JobApplication />} />
          
          
          {/* Contact sub-pages */}
          <Route path="/contact/inquiry" element={<Inquiry />} />
          <Route path="/contact/location" element={<Location />} />
          <Route path="/contact/departments" element={<Departments />} />
          
          {/* Admin page */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/master" element={<AdminPanel />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
</TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;