import ProfileImage from "./profile/ProfileImage";
import ProfileInfo from "./profile/ProfileInfo";
import Achievements from "./profile/Achievements";

const achievements = [
  {
    title: "Founder & CEO of Bit2Big",
    content: [
      "Leading blockchain consulting firm revolutionizing land registration",
      "Implementing solutions in healthcare, agriculture, and finance",
      "Training over 2,000 learners annually through conferences and workshops"
    ]
  },
  {
    title: "Notable Speaking Engagements",
    content: [
      "Presidential roundtable at Minerals Africa Development Institution (MADI)",
      "BLOCKCHANCE Europe keynote speaker",
      "Regular TEDx speaker on blockchain and digital innovation"
    ]
  },
  {
    title: "Leadership & Recognition",
    content: [
      "Vice Chairman of the Blockchain Association of Uganda",
      "Featured in Spiegel and Guardian for blockchain advocacy",
      "CTO at Minerals Africa Development Institution"
    ]
  }
];

const socialLinks = [
  {
    title: "LinkedIn Profile",
    url: "https://ch.linkedin.com/in/michaelkiberu"
  },
  {
    title: "TEDx Talk",
    url: "https://www.youtube.com/watch?v=6MhUdXPdRb8"
  },
  {
    title: "Spiegel Feature",
    url: "https://www.spiegel.de/wirtschaft/soziales/blockchain-wie-die-neue-technologie-die-wirtschaft-in-afrika-umkrempelt-a-b4800ede-9f40-4925-8a9f-d946c8d2d1e5"
  }
];

const CoachProfile = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <ProfileImage socialLinks={socialLinks} />
      
      <div className="md:col-span-2 space-y-8">
        <ProfileInfo 
          name="Dr. Michael Kiberu N."
          description="A leading advocate for blockchain technology and cryptocurrencies in Africa, 
            Dr. Kiberu leverages digital innovation to address fundamental challenges 
            in sectors such as land registration, healthcare, finance, and more. With 
            expertise spanning AI, cybersecurity, and fintech, he champions homegrown 
            solutions that empower young African talent and foster inclusive economic 
            development."
        />

        <Achievements achievements={achievements} />

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Personal Commitment</h3>
          <p className="text-muted-foreground">
            As a father of five, Dr. Kiberu blends entrepreneurial vigor with genuine 
            empathy for everyday needs—striving to create real-world solutions that 
            uplift communities. His vision is clear: Africa must not miss the fourth 
            technological wave reshaping the global economy.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Educational Impact</h3>
          <p className="text-muted-foreground">
            Through Bit2Big's comprehensive educational programs, Dr. Kiberu and his 
            team train thousands of learners annually. His approach emphasizes practical, 
            hands-on experience and focuses on developing solutions tailored to African 
            challenges. As he often states, "if we don't take the youth on this journey, 
            we're losing out."
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;