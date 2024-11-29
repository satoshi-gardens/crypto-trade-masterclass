import { useState, useMemo } from "react";
import CourseModule from "./CourseModule";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CourseFilters } from "./CourseFilters";
import { CoursePagination } from "./CoursePagination";
import { allModules } from "@/data/courseModules";

const ITEMS_PER_PAGE = 6;

const CourseModules = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComplexity, setSelectedComplexity] = useState<"Beginner" | "Intermediate" | "Advanced" | "all">("all");
  const [showExtraCourses, setShowExtraCourses] = useState(false);

  const filteredModules = useMemo(() => {
    return allModules.filter((module) => {
      const matchesSearch = 
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesComplexity = 
        selectedComplexity === "all" || 
        module.complexity === selectedComplexity;

      const matchesExtra = 
        (showExtraCourses && module.isExtra) || 
        (!showExtraCourses && !module.isExtra);

      return matchesSearch && matchesComplexity && matchesExtra;
    });
  }, [searchQuery, selectedComplexity, showExtraCourses]);

  const totalPages = Math.ceil(filteredModules.length / ITEMS_PER_PAGE);
  const paginatedModules = filteredModules.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Course Modules</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive learning modules designed to take you from basics to advanced trading
          </p>
        </div>

        <div className="space-y-6">
          <div className="max-w-md mx-auto mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>

          <CourseFilters
            selectedComplexity={selectedComplexity}
            onComplexityChange={(complexity) => {
              setSelectedComplexity(complexity);
              setCurrentPage(1);
            }}
            showExtraCourses={showExtraCourses}
            onExtraCoursesChange={(show) => {
              setShowExtraCourses(show);
              setCurrentPage(1);
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedModules.map((module) => (
              <CourseModule key={module.id} {...module} />
            ))}
          </div>

          {filteredModules.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-xl text-gray-600">No modules found matching your criteria</p>
            </div>
          )}

          {filteredModules.length > ITEMS_PER_PAGE && (
            <CoursePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseModules;