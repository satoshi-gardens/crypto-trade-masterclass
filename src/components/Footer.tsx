import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp, Home, BookOpen, Wrench, Brain, Info, Mail, MessageSquare, Star, Users } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Anti-spam email protection
  const emailParts = {
    user: "trading4profits",
    domain: "bit2big.com"
  };

  const constructEmail = () => {
    return `${emailParts.user}@${emailParts.domain}`;
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/contact');
  };

  // Phone number protection
  const phoneDigits = "+41783095701";
  const formatPhone = () => {
    return "+41 78 309 57 01";
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `tel:${phoneDigits}`;
  };

  return (
    <footer className="bg-accent pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Branding Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">KY Connect</h3>
            <p className="text-sm text-gray-600">
              Empowering Profitable Trading
            </p>
            <p className="text-sm text-gray-600">
              &copy; {currentYear} KIPYA Connect. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-800">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
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
                <span>Tools & Resources</span>
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

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-800">Contact Us</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <a
                  href="#"
                  onClick={handleEmailClick}
                  className="hover:text-primary transition-colors"
                  data-email="contact"
                >
                  Email Us
                </a>
              </p>
              <p>
                <a
                  href="#"
                  onClick={handlePhoneClick}
                  className="hover:text-primary transition-colors"
                >
                  {formatPhone()}
                </a>
              </p>
              <address className="not-italic text-sm">
                Turbinenstrasse 31<br />
                8005 Zürich<br />
                Switzerland
              </address>
            </div>
          </div>

          {/* Community & Feedback */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-800">Community</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/testimonials" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <Star size={16} />
                <span>Share Your Story</span>
              </Link>
              <Link to="/feedback" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <MessageSquare size={16} />
                <span>Give Feedback</span>
              </Link>
              <Link to="/referral" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <Users size={16} />
                <span>Referral Program</span>
              </Link>
            </nav>

            <div className="flex space-x-4">
              <a href="https://twitter.com/Crypto4Profits" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-600 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/michaelkiberu/" target="_blank" rel="noopener noreferrer"
                 className="text-gray-600 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/crypto4profits" target="_blank" rel="noopener noreferrer"
                 className="text-gray-600 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/crypto4profits" target="_blank" rel="noopener noreferrer"
                 className="text-gray-600 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
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