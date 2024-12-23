import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ModuleSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ModuleSearch = ({ searchQuery, onSearchChange }: ModuleSearchProps) => {
  return (
    <div className="max-w-md mx-auto mb-6 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        id="module-search"
        name="module-search"
        placeholder="Search modules..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};