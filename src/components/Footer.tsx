import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp, Home, BookOpen, Wrench, Brain, Info, Mail, MessageSquare, Star, Users } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-accent pt-8 pb-4">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Branding Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-800">KY Connect</h3>
            <p className="text-sm text-gray-600">
              Empowering Profitable Trading
            </p>
            <p className="text-sm text-gray-600">
              &copy; {currentYear} KIPYA Connect. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-800">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-2">
              <Link to="/" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <Home size={16} />
                <span>Home</span>
              </Link>
              <Link to="/courses" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <BookOpen size={16} />
                <span>Courses</span>
              </Link>
              <Link to="/tools" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <Wrench size={16} />
                <span>Tools</span>
              </Link>
              <Link to="/loop-method" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <Brain size={16} />
                <span>LOOP Method</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <Info size={16} />
                <span>About</span>
              </Link>
              <Link to="/contact" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <Mail size={16} />
                <span>Contact</span>
              </Link>
            </nav>
          </div>

          {/* Community & Social */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-800">Community</h4>
            <nav className="grid grid-cols-2 gap-2">
              <Link to="/testimonials" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <Star size={16} />
                <span>Share Story</span>
              </Link>
              <Link to="/feedback" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <MessageSquare size={16} />
                <span>Feedback</span>
              </Link>
              <Link to="/referral" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <Users size={16} />
                <span>Referrals</span>
              </Link>
            </nav>

            <div className="flex space-x-4 pt-2">
              <a href="https://twitter.com/bit2big" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-600 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/bit2big/" target="_blank" rel="noopener noreferrer"
                 className="text-gray-600 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/bit2big" target="_blank" rel="noopener noreferrer"
                 className="text-gray-600 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/bit2big" target="_blank" rel="noopener noreferrer"
                 className="text-gray-600 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-xs text-gray-600 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-gray-600 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="group text-xs"
            >
              <ArrowUp className="w-3 h-3 mr-1 group-hover:text-primary" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;