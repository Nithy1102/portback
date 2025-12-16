import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import admin from "@/pages/admin";
import { useState, useEffect } from "react";
import PixelLoader from "@/components/PixelLoader";



function App() {
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const cursor = document.getElementById("custom-cursor");
  const trail = document.getElementById("cursor-trail");

  if (!cursor || !trail) return;

  const move = (e: MouseEvent) => {
    cursor.style.opacity = "1";

    // EXACT positioning — no offset
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Trail particle behind cursor
    const p = document.createElement("div");
    p.className = "cursor-particle";
    p.style.left = e.clientX + "px";
    p.style.top = e.clientY + "px";
    trail.appendChild(p);

    setTimeout(() => p.remove(), 350);
  };

  window.addEventListener("mousemove", move);
  return () => window.removeEventListener("mousemove", move);
}, []);


  return (
    <>
      {/* ⭐ Custom Cursor ALWAYS visible (even during loader) */}
      <div id="custom-cursor">
        <img src="/favicon.png" alt="Cursor" />
      </div>

      <div id="cursor-trail"></div>

      {/* LOADER FIRST */}
      {loading ? (
        <PixelLoader onComplete={() => setLoading(false)} />
      ) : (
        <QueryClientProvider client={queryClient}>
          <div className="bg-background min-h-screen text-foreground">
            <Navbar />

            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/services" component={Services} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/contact" component={Contact} />
              <Route path="/admin" component={admin} />
              <Route component={NotFound} />
            </Switch>

            <Toaster />
          </div>
          <Footer />
        </QueryClientProvider>
      )}
      
    </>
  );
}

export default App;
