
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ImpactStories from "./pages/ImpactStories";
import GetInvolved from "./pages/GetInvolved";
import Episodes from "./pages/Episodes";
import EpisodeDetails from "./pages/EpisodeDetails";
import Posts from "./pages/Posts";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/impact-stories" element={<ImpactStories />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:id" element={<EpisodeDetails />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
