import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import LoopMethodComponent from "@/components/LoopMethod";

const LoopMethod = () => {
  return (
    <PageLayout>
      <Hero
        title="The LOOP Method"
        subtitle="Learn our proven step-by-step method for profitable crypto trading"
        buttonText="Start Learning"
        buttonLink="/courses"
      />
      <LoopMethodComponent />
    </PageLayout>
  );
};

export default LoopMethod;