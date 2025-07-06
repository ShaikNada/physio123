import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./components/AdminLogin";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import AdminPanel from "./components/AdminPanel";



const queryClient = new QueryClient();
const ProtectedAdminRoute = () => {
  const { isAuthenticated } = useAdmin();
  
  if (!isAuthenticated) {
    return <AdminLogin />;
  }
  
  return <AdminPanel />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
   <AdminProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<ProtectedAdminRoute />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
