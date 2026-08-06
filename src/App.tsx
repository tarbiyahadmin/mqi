import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GlobalGrain } from "@/components/layout/GlobalGrain";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { OrganizationJsonLd } from "@/components/OrganizationJsonLd";
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const ProgramDetail = lazy(() => import("./pages/ProgramDetail"));
const Careers = lazy(() => import("./pages/Careers"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Donate = lazy(() => import("./pages/Donate"));
const FinancialAid = lazy(() => import("./pages/FinancialAid"));
const BookMeet = lazy(() => import("./pages/BookMeet"));
const FormPageRoute = lazy(() => import("./pages/FormPage"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <OrganizationJsonLd />
        <div className="relative flex min-h-screen flex-1 flex-col">
          <GlobalGrain />
          <Header />
          <div className="relative z-10 flex-1">
            <Suspense fallback={<div className="container py-16 text-sm text-muted-foreground">Loading page...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:category/:programSlug" element={<ProgramDetail />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/financial-aid" element={<FinancialAid />} />
                <Route path="/book-a-meet" element={<BookMeet />} />
                <Route path="/forms/:slug" element={<FormPageRoute />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
