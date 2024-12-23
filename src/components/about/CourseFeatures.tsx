import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const courseFeatures = [
  "One-on-one sessions with Dr. Michael Kiberu",
  "Customized learning path based on your goals and experience",
  "Real-time market analysis and trading practice",
  "Access to proprietary trading tools and resources",
  "Ongoing support and mentorship",
];

const courseRequirements = [
  "A laptop or desktop computer",
  "A trading account (we'll set this up together on the first day)",
  "Starting capital of at least 1000 CHF",
  "Dedication and willingness to learn",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

const CourseFeatures = () => {
  const navigate = useNavigate();

  const handleBookSession = () => {
    navigate("/courses#packages");
  };

  return (
    <div className="space-y-12">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-8"
      >
        <Card className="backdrop-blur-sm bg-white/50 border-2 hover:border-primary transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Course Features</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.ul className="space-y-4" variants={container}>
              {courseFeatures.map((feature, index) => (
                <motion.li 
                  key={index} 
                  variants={item}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/50 border-2 hover:border-primary transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Course Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.ul className="space-y-4" variants={container}>
              {courseRequirements.map((requirement, index) => (
                <motion.li 
                  key={index} 
                  variants={item}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700">{requirement}</span>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Button 
          size="lg" 
          onClick={handleBookSession}
          className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Book Your First Session
        </Button>
      </motion.div>
    </div>
  );
};

export default CourseFeatures;