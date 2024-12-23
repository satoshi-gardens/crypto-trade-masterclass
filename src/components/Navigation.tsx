import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, Home, BookOpen, User, LoopCircle, Tools } from "lucide-react";

const Navigation = () => {
  const handleSheetClose = () => {
    const button = document.querySelector('button[type="button"]') as HTMLButtonElement;
    if (button) button.click();
  };

  const navigationItems = [
    { path: "/", label: "Home", icon: <Home className="w-4 h-4 mr-2" /> },
    { path: "/courses", label: "Courses", icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { path: "/about", label: "About", icon: <User className="w-4 h-4 mr-2" /> },
    { path: "/loop-method", label: "LOOP", icon: <LoopCircle className="w-4 h-4 mr-2" /> },
    { path: "/tools", label: "Tools and Resources", icon: <Tools className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="w-14 h-14 transition-transform hover:scale-105" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center text-gray-600 hover:text-primary transition-colors"
                    onClick={handleSheetClose}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;