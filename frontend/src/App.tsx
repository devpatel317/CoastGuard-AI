import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import AlertBanner from "./components/AlertBanner";
import ChatWidget from "./components/ChatWidget";
import Dashboard from "./pages/Dashboard";
import Heatmaps from "./pages/Heatmaps";
import CommunityReports from "./pages/CommunityReports";
import SitReps from "./pages/SitReps";
import ClimateProjections from "./pages/ClimateProjections";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <AlertBanner />
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/heatmaps" element={<Heatmaps />} />
            <Route path="/reports" element={<CommunityReports />} />
            <Route path="/sitreps" element={<SitReps />} />
            <Route path="/climate" element={<ClimateProjections />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatWidget />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
