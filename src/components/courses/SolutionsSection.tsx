const solutions = [
  {
    title: "Fundamentals Training",
    description: "Build a solid foundation in crypto trading basics and market analysis.",
    icon: "📊",
  },
  {
    title: "AI & Advanced Trading",
    description: "Learn to leverage cutting-edge tools and AI-powered analysis for better trading decisions.",
    icon: "🤖",
  },
  {
    title: "Community & Essentials",
    description: "Join a supportive community of traders and access essential trading resources.",
    icon: "👥",
  },
  {
    title: "Holistic Onboarding",
    description: "Get step-by-step guidance through every aspect of crypto trading.",
    icon: "🎯",
  },
  {
    title: "Tailored Learning",
    description: "Personalized learning paths to match your goals and experience level.",
    icon: "📚",
  },
];

const SolutionsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Comprehensive Solution</h2>
        <p className="text-lg text-gray-600">
          A complete approach to mastering cryptocurrency trading through expert
          guidance and practical experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
        {solutions.map((solution, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <span className="text-4xl mb-4 block">{solution.icon}</span>
            <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
            <p className="text-gray-600">{solution.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SolutionsSection;