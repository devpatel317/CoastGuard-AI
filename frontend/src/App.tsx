import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import AlertBanner from "./components/AlertBanner";
import ChatWidget from "./components/ChatWidget";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Heatmaps from "./pages/Heatmaps";
import CommunityReports from "./pages/CommunityReports";
import SitReps from "./pages/SitReps";
import ClimateProjections from "./pages/ClimateProjections";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Landing page route - no navigation/alerts shown */}
            <Route path="/" element={<Landing />} />
            
            {/* Dashboard and other routes with full UI */}
            <Route path="/dashboard" element={
              <>
                <AlertBanner />
                <Navigation />
                <Dashboard />
                <ChatWidget />
              </>
            } />
            <Route path="/heatmaps" element={
              <>
                <AlertBanner />
                <Navigation />
                <Heatmaps />
                <ChatWidget />
              </>
            } />
            <Route path="/reports" element={
              <>
                <AlertBanner />
                <Navigation />
                <CommunityReports />
                <ChatWidget />
              </>
            } />
            <Route path="/sitreps" element={
              <>
                <AlertBanner />
                <Navigation />
                <SitReps />
                <ChatWidget />
              </>
            } />
            <Route path="/climate" element={
              <>
                <AlertBanner />
                <Navigation />
                <ClimateProjections />
                <ChatWidget />
              </>
            } />
            <Route path="/settings" element={
              <>
                <AlertBanner />
                <Navigation />
                <Settings />
                <ChatWidget />
              </>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;