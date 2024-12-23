import Hero from "@/components/Hero";
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Hero
        title="Our Mission: Making Digital Assets Matter"
        subtitle="We started Bit2Big with a clear vision: to demystify cryptocurrency trading and create awareness of blockchain's transformative potential."
        showButton={false}
      />
    </motion.div>
  );
};

export default AboutHero;