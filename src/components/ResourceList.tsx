import { ResourceCategory } from "@/types/resources";
import ResourceCard from "./ResourceCard";

interface ResourceListProps {
  category: ResourceCategory;
}

const ResourceList = ({ category }: ResourceListProps) => {
  return (
    <section className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {category.title}
        </h2>
        <p className="text-gray-600">{category.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
};

export default ResourceList;