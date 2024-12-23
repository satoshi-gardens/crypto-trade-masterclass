interface Achievement {
  title: string;
  content: string[];
}

interface AchievementsProps {
  achievements: Achievement[];
}

const Achievements = ({ achievements }: AchievementsProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Key Achievements & Roles</h3>
      <div className="grid gap-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="space-y-3">
            <h4 className="text-xl font-semibold text-primary">
              {achievement.title}
            </h4>
            <ul className="space-y-2">
              {achievement.content.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="block w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;