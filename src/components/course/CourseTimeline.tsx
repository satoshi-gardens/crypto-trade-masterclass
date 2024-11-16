import { Clock, BookOpen, Signal, Brain } from "lucide-react";

export const CourseTimeline = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h3 className="text-2xl font-bold text-center mb-8">Monthly Learning Cycle</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h4 className="font-semibold">Week 1</h4>
            </div>
            <p className="text-sm text-gray-600">Live Sessions + Blockbits Practice</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <h4 className="font-semibold">Week 2-3</h4>
            </div>
            <p className="text-sm text-gray-600">Practical Application + Coaching</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-primary" />
              <h4 className="font-semibold">Week 4</h4>
            </div>
            <p className="text-sm text-gray-600">Self-study & Reflection</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Signal className="w-6 h-6 text-primary" />
              <h4 className="font-semibold">Month 2+</h4>
            </div>
            <p className="text-sm text-gray-600">Trading Signals Begin*</p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">*For Premium and Hybrid packages</p>
      </div>
    </div>
  );
};