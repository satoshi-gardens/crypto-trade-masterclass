import { CheckCircle2 } from "lucide-react";

interface Achievement {
  text: string;
}

const achievements: Achievement[] = [
  { text: "Creator of the LOOP (Live On yOur Profits) Method" },
  { text: "Featured speaker at multiple blockchain conferences in Europe" },
  { text: "Profiled in Spiegel Germany" },
  { text: "TEDx Speaker on the future of finance and cryptocurrency" },
];

const CoachProfile = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <img
          src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
          alt="Dr. Michael Kiberu"
          className="rounded-lg w-full object-cover aspect-square"
        />
      </div>
      <div className="md:col-span-2 space-y-6">
        <h3 className="text-2xl font-semibold">Dr. Michael Kiberu</h3>
        <p className="text-muted-foreground">
          Dr. Michael Kiberu is a seasoned cryptocurrency trader and educator with over a decade
          of experience in the financial markets. His journey in the crypto space began in
          the early days of Bitcoin, and he has since become a respected voice in the
          industry.
        </p>
        
        <div className="space-y-4">
          <h4 className="text-xl font-semibold">Key Achievements</h4>
          <ul className="space-y-3">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span>{achievement.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold">Our Story</h4>
          <p className="text-muted-foreground">
            Bit2Big was born from a simple observation: while blockchain technology and cryptocurrencies 
            were revolutionizing finance, most people lacked the knowledge to participate confidently. 
            We set out to change that by creating a comprehensive education platform that makes digital 
            assets accessible to everyone.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold">Teaching Philosophy</h4>
          <p className="text-muted-foreground">
            Our approach combines theoretical understanding with practical application. We believe in 
            empowering our students with both knowledge and hands-on experience, ensuring they can 
            navigate the crypto markets with confidence and success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;