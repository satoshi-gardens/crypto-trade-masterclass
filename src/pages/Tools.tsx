import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import ResourceList from "@/components/ResourceList";
import ToolsSearch from "@/components/tools/ToolsSearch";
import ToolsDisclaimer from "@/components/tools/ToolsDisclaimer";
import Hero from "@/components/Hero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RESOURCES_DATA } from "@/data/resources";
import { useNavigate } from "react-router-dom";

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate("/courses#packages");
  };

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
      <Hero
        title="Tools and Resources for Profitable Trading"
        subtitle="Explore our curated collection of guides, videos, and tools designed to help you trade smarter and achieve your financial goals."
        backgroundClass="bg-[#F8F8F8]"
        buttonText="Start Your Journey"
        onButtonClick={handleStartJourney}
        showButton={true}
      />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
        <ToolsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ToolsDisclaimer />

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-start mb-8 bg-background">
            <TabsTrigger value="all" className="flex-grow sm:flex-grow-0">All</TabsTrigger>
            {RESOURCES_DATA.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex-grow sm:flex-grow-0"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            {filteredResources.length > 0 ? (
              <div className="space-y-16 animate-fade-in">
                {filteredResources.map((category) => (
                  <ResourceList key={category.id} category={category} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-accent/5 rounded-lg">
                <p className="text-xl text-gray-600">No resources found</p>
              </div>
            )}
          </TabsContent>

          {RESOURCES_DATA.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="animate-fade-in">
                <ResourceList 
                  category={{
                    ...category,
                    items: category.items.filter(
                      (item) =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase())
                    ),
                  }} 
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Tools;