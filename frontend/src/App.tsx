import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatedRoutes } from "@/components/AnimatedRoutes";
import { PageTransition } from "@/components/PageTransition";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminArticles from "./pages/admin/Articles";
import AdminImages from "./pages/admin/Images";
import AdminSettings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Header />
          <AnimatedRoutes>
            <Route path="/" data-genie-key="Home" data-genie-title="首页" element={<PageTransition transition="slide-up"><Index /></PageTransition>} />
            <Route path="/about" data-genie-key="About" data-genie-title="关于我们" element={<PageTransition transition="fade"><About /></PageTransition>} />
            <Route path="/products" data-genie-key="Products" data-genie-title="产品服务" element={<PageTransition transition="fade"><Products /></PageTransition>} />
            <Route path="/contact" data-genie-key="Contact" data-genie-title="联系我们" element={<PageTransition transition="fade"><Contact /></PageTransition>} />
            <Route path="/admin" data-genie-key="Admin" data-genie-title="管理后台" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="images" element={<AdminImages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="*" data-genie-key="NotFound" data-genie-title="Not Found" element={<PageTransition transition="fade"><NotFound /></PageTransition>} />
          </AnimatedRoutes>
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Footer />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
