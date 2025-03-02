
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp, Home, BookOpen, Wrench, Brain, Info, Mail, MessageSquare, Star, Users, MessageCircle } from "lucide-react";
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
              <a href="https://discord.gg/uKTdJauUvU" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4"
                >
                  <circle cx="9" cy="12" r="1"/>
                  <circle cx="15" cy="12" r="1"/>
                  <path d="M7.5 7.5c3.5-1 5.5-1 9 0"/>
                  <path d="M7 16.5c3.5 1 6.5 1 10 0"/>
                  <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"/>
                  <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.476-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5"/>
                </svg>
                <span>Join Discord</span>
              </a>
            </nav>

            <div className="flex space-x-4 pt-2">
              <a href="https://discord.gg/uKTdJauUvU" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-600 hover:text-primary transition-colors" aria-label="Join our Discord community">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <circle cx="9" cy="12" r="1"/>
                  <circle cx="15" cy="12" r="1"/>
                  <path d="M7.5 7.5c3.5-1 5.5-1 9 0"/>
                  <path d="M7 16.5c3.5 1 6.5 1 10 0"/>
                  <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"/>
                  <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.476-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5"/>
                </svg>
              </a>
              <a href="https://t.me/blockchainafricaio" target="_blank" rel="noopener noreferrer"
                 className="text-gray-600 hover:text-primary transition-colors" aria-label="Join our Telegram channel">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M21.73 4.1a2 2 0 0 0-1.6-.72 3.09 3.09 0 0 0-1.42.44L3.16 13.37a1.5 1.5 0 0 0-.77 1.56 2 2 0 0 0 1.33 1.45l3.46 1.08a1 1 0 0 0 .87-.14l7.9-5.9a.5.5 0 0 1 .65.05.49.49 0 0 1 .05.65l-6.42 6.74a1 1 0 0 0-.24.87L11 22.63a2 2 0 0 0 1.89 1.37 2 2 0 0 0 1.48-.64l3.12-3.37a83.97 83.97 0 0 0 4.84-5.62 5 5 0 0 0 1.35-4.1 2 2 0 0 0-1.95-6.17Z" />
                </svg>
              </a>
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
