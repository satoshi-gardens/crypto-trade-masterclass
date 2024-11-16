import CourseCard from "./CourseCard";
import { toast } from "sonner";

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
}

interface CourseListProps {
  courses: Course[];
  searchQuery: string;
}

const CourseList = ({ courses, searchQuery }: CourseListProps) => {
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookCourse = (courseId: string) => {
    toast.success("Course booking initiated. Our team will contact you shortly.");
    // TODO: Implement actual booking logic
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course) => (
        <CourseCard
          key={course.id}
          {...course}
          onBook={() => handleBookCourse(course.id)}
        />
      ))}
    </div>
  );
};

export default CourseList;