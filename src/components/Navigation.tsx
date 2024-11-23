import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Tools & Resources", path: "/tools" },
    { name: "LOOP Method", path: "/loop-method" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo - Centered on mobile, left-aligned on desktop */}
          <Link 
            to="/" 
            className="text-xl font-semibold text-gray-900 transition-colors duration-200 hover:text-primary"
          >
            CT4P
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base transition-all duration-200 relative
                  ${
                    isActive(item.path)
                      ? "text-primary font-semibold after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:bottom-[-4px] after:left-0"
                      : "text-gray-600 hover:text-primary"
                  }
                  before:content-[''] before:absolute before:w-full before:h-0.5 before:bg-primary before:bottom-[-4px] before:left-0
                  before:transform before:scale-x-0 before:transition-transform before:duration-200
                  hover:before:scale-x-100 before:origin-left
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-[72px] bg-white/95 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="flex flex-col p-6 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg py-3 px-4 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-primary font-semibold bg-primary/5"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;