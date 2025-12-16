import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Home scroll logic
  const goHome = () => {
    if (location === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    {name:"Admin",path:"/admin"},
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-panel py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <button
          onClick={goHome}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/favicon.png"
            alt="TUTE Logo"
            className="w-10 h-auto drop-shadow-[0_0_6px_#8b5cf6]"
          />
          <span className="text-2xl font-orbitron font-bold tracking-widest gradient-text">
            TUTE
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.name === "Home" ? (
              <button
                key={link.name}
                onClick={goHome}
                className={`text-sm font-rajdhani font-semibold tracking-wide uppercase transition-colors hover:text-primary cursor-pointer ${
                  location === "/"
                    ? "text-primary text-glow-purple"
                    : "text-gray-300"
                }`}
              >
                Home
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-rajdhani font-semibold tracking-wide uppercase transition-colors hover:text-primary cursor-pointer ${
                  location === link.path
                    ? "text-primary text-glow-purple"
                    : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            )
          )}

          <Link
            href="/contact"
            className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all font-orbitron text-xs tracking-widest uppercase rounded-sm cursor-pointer"
          >
            Start Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/10"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) =>
                link.name === "Home" ? (
                  <button
                    key={link.name}
                    onClick={goHome}
                    className={`text-lg font-rajdhani font-semibold uppercase text-left ${
                      location === "/" ? "text-primary" : "text-white"
                    }`}
                  >
                    Home
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-rajdhani font-semibold uppercase cursor-pointer ${
                      location === link.path ? "text-primary" : "text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
