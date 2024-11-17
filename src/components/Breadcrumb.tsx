import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground px-6 py-4">
      <Link to="/" className="hover:text-foreground">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          <Link
            to={item.href}
            className={index === items.length - 1 ? "text-foreground font-medium" : "hover:text-foreground"}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;