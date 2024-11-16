import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import SearchBar from "@/components/SearchBar";
import ResourceList from "@/components/ResourceList";
import { ResourceCategory } from "@/types/resources";

const RESOURCES_DATA: ResourceCategory[] = [
  {
    id: "guides",
    title: "Guides",
    description: "Step-by-step written guides to master crypto trading",
    items: [
      {
        id: "1",
        title: "Crypto Basics Guide",
        description: "Understand the fundamentals of cryptocurrency.",
        type: "guide",
      },
      {
        id: "2",
        title: "Advanced Strategies",
        description: "Techniques for maximizing your profits.",
        type: "guide",
      },
    ],
  },
  {
    id: "videos",
    title: "Videos",
    description: "Recorded tutorials and expert sessions",
    items: [
      {
        id: "3",
        title: "Intro to Trading",
        description: "Start your trading journey with confidence.",
        type: "video",
      },
      {
        id: "4",
        title: "Risk Management",
        description: "Learn to minimize risks and protect your portfolio.",
        type: "video",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "Software and calculators for trading support",
    items: [
      {
        id: "5",
        title: "Profit Calculator",
        description: "Estimate your potential gains.",
        type: "tool",
      },
      {
        id: "6",
        title: "Portfolio Tracker",
        description: "Keep track of your investments.",
        type: "tool",
      },
    ],
  },
];

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = RESOURCES_DATA.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.items.length > 0);

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Tools and Resources for Profitable Trading
          </h1>
          <p className="text-xl text-gray-600">
            Explore our curated collection of guides, videos, and tools designed to
            help you trade smarter and achieve your financial goals.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search resources..."
          />
        </div>

        {filteredResources.length > 0 ? (
          <div className="space-y-16">
            {filteredResources.map((category) => (
              <ResourceList key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No resources found</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Tools;