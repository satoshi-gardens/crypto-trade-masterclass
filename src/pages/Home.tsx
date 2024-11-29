import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <PageLayout>
      <Hero
        title="Welcome to KY Connect"
        subtitle="Your gateway to profitable cryptocurrency trading"
        showButton={true}
        buttonText="Start Learning"
        buttonLink="/courses"
      />
    </PageLayout>
  );
};

export default Home;