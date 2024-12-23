interface ProfileInfoProps {
  name: string;
  description: string;
}

const ProfileInfo = ({ name, description }: ProfileInfoProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{name}</h2>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  );
};

export default ProfileInfo;