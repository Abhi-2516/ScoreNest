
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="/logo.png"  height={24} width={24}/>
            <Link to="/" className="flex items-center space-x-2 ml-2">
              <motion.span 
                className="text-2xl font-bold text-gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ScoreNest
              </motion.span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }>
              Home
            </NavLink>
            <NavLink to="/calculator" className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }>
              Calculator
            </NavLink>
            <NavLink to="/improvement" className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }>
              Improvement
            </NavLink>
            <NavLink to="/companies" className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }>
              Companies
            </NavLink>
            <NavLink to="/chat" className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }>
              CGPA Chat
            </NavLink>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-foreground hover:bg-primary transition duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/calculator"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calculator
            </NavLink>
            <NavLink
              to="/improvement"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Improvement
            </NavLink>
            <NavLink
              to="/companies"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Companies
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CGPA Chat
            </NavLink>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
