import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatedRoutes } from "@/components/AnimatedRoutes";
import { PageTransition } from "@/components/PageTransition";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
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
            <Route path="*" data-genie-key="NotFound" data-genie-title="Not Found" element={<PageTransition transition="fade"><NotFound /></PageTransition>} />
          </AnimatedRoutes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
