import { useState, useMemo } from "react";
import { ModuleSearch } from "./modules/ModuleSearch";
import { ModuleGrid } from "./modules/ModuleGrid";
import { ModuleHeader } from "./modules/ModuleHeader";
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
        <ModuleHeader />

        <div className="space-y-6">
          <ModuleSearch 
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
              setCurrentPage(1);
            }}
          />

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

          <ModuleGrid modules={paginatedModules} />

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