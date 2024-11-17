import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";

const Security = () => {
  const breadcrumbItems = [
    { label: "Tools", href: "/tools" },
    { label: "Knowledge Base", href: "/tools#knowledge" },
    { label: "Security", href: "/guides/security" },
  ];

  return (
    <PageLayout>
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Security Best Practices</h1>
        <div className="prose max-w-none">
          <p className="text-xl mb-6">
            Protect your crypto assets by implementing essential security measures and best practices
            for safe trading and storage.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Security Essentials</h2>
          <ul className="space-y-2 mb-8">
            <li>• Secure wallet management</li>
            <li>• Two-factor authentication</li>
            <li>• Safe trading practices</li>
            <li>• Avoiding common scams</li>
          </ul>

          <div className="bg-accent/10 p-6 rounded-lg mb-8">
            <p className="text-lg mb-4">
              Learn comprehensive security measures and best practices in our detailed course modules.
            </p>
            <Button asChild>
              <Link to="/courses">Secure Your Future</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Security;