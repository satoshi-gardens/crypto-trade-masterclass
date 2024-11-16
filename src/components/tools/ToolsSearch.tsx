import SearchBar from "@/components/SearchBar";

interface ToolsSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ToolsSearch = ({ searchQuery, setSearchQuery }: ToolsSearchProps) => {
  return (
    <div className="max-w-xl mx-auto mb-12">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search resources..."
      />
    </div>
  );
};

export default ToolsSearch;