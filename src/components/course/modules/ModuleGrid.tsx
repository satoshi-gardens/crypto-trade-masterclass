import CourseModule from "../CourseModule";
import { CourseModuleProps } from "../CourseModule";

interface ModuleGridProps {
  modules: CourseModuleProps[];
}

export const ModuleGrid = ({ modules }: ModuleGridProps) => {
  if (modules.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-xl text-gray-600">No modules found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <CourseModule key={module.id} {...module} />
      ))}
    </div>
  );
};