import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navigation = () => {
  const handleSheetClose = () => {
    const button = document.querySelector('button[type="button"]') as HTMLButtonElement;
    if (button) button.click();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="w-14 h-14 transition-transform hover:scale-105" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary">
              Home
            </Link>
            <Link to="/courses" className="text-gray-600 hover:text-primary">
              Courses
            </Link>
            <Link to="/tools" className="text-gray-600 hover:text-primary">
              Tools and Resources
            </Link>
            <Link to="/loop-method" className="text-gray-600 hover:text-primary">
              LOOP Method
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary">
              About
            </Link>
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
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary"
                  onClick={handleSheetClose}
                >
                  Home
                </Link>
                <Link
                  to="/courses"
                  className="text-gray-600 hover:text-primary"
                  onClick={handleSheetClose}
                >
                  Courses
                </Link>
                <Link
                  to="/tools"
                  className="text-gray-600 hover:text-primary"
                  onClick={handleSheetClose}
                >
                  Tools and Resources
                </Link>
                <Link
                  to="/loop-method"
                  className="text-gray-600 hover:text-primary"
                  onClick={handleSheetClose}
                >
                  LOOP Method
                </Link>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary"
                  onClick={handleSheetClose}
                >
                  About
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;