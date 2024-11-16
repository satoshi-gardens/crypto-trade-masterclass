import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import SearchBar from "@/components/SearchBar";
import CourseList from "@/components/CourseList";
import type { Course } from "@/components/CourseList";

// Placeholder data - will be replaced with API call
const COURSES: Course[] = [
  {
    id: "1",
    title: "Crypto Trading Basics",
    description: "Learn the fundamentals of crypto trading.",
    duration: 6,
    price: 5000,
  },
  {
    id: "2",
    title: "Advanced Trading Strategies",
    description: "Master advanced trading techniques for greater profits.",
    duration: 8,
    price: 15000,
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-xl text-gray-600">
            Choose from a range of courses designed to help you master crypto trading.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by course name or description..."
          />
        </div>

        <CourseList courses={COURSES} searchQuery={searchQuery} />
      </div>
    </PageLayout>
  );
};

export default Courses;