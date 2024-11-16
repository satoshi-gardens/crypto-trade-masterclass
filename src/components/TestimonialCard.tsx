interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  imageUrl: string;
}

const TestimonialCard = ({ name, role, content, imageUrl }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default TestimonialCard;