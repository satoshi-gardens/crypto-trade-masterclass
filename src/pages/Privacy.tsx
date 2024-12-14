import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate("/courses#packages");
  };

  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
          <div className="prose max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us when using our services.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information to provide and improve our services, communicate with you, and ensure compliance with our terms.</p>

            <h2>3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information in limited circumstances as described below.</p>

            <h2>4. Special Offers and Marketing</h2>
            <p>We may send you promotional offers and updates about our services. Please note:</p>
            <ul>
              <li>Each promotional offer is subject to specific terms and conditions</li>
              <li>Discounts and promotional offers cannot be combined with other active promotions</li>
              <li>You can opt-out of marketing communications at any time</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information.</p>

            <h2>7. Cookies</h2>
            <p>We use cookies and similar technologies to enhance your experience on our platform.</p>

            <h2>8. Changes to Privacy Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any significant changes.</p>

            <div className="mt-8 flex justify-start">
              <Button 
                onClick={handleStartJourney}
                className="bg-primary hover:bg-primary/90"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;