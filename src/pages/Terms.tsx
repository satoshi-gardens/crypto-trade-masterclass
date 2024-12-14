import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate("/courses#packages");
  };

  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
          <div className="prose max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using our services, you agree to be bound by these Terms of Service.</p>

            <h2>2. Service Description</h2>
            <p>We provide cryptocurrency trading education and mentorship services through various course packages and formats.</p>

            <h2>3. Course Packages and Payments</h2>
            <p>We offer different course packages with varying features and pricing options. Payment can be made in full or through installment plans as specified in the course details.</p>

            <h2>4. Special Offers and Discounts</h2>
            <p>From time to time, we may offer special promotions and discounts. Please note:</p>
            <ul>
              <li>Promotional offers are valid only for the specified duration</li>
              <li>Discounts cannot be combined with other offers or promotions</li>
              <li>Referral discounts are subject to our referral program terms</li>
              <li>We reserve the right to modify or withdraw offers at any time</li>
            </ul>

            <h2>5. Refund Policy</h2>
            <p>Refund requests are evaluated on a case-by-case basis and must be submitted within 14 days of purchase.</p>

            <h2>6. Intellectual Property</h2>
            <p>All course materials, including but not limited to videos, documents, and presentations, are protected by copyright laws.</p>

            <h2>7. User Conduct</h2>
            <p>Users must maintain professional conduct during all interactions and adhere to our community guidelines.</p>

            <h2>8. Privacy</h2>
            <p>Your privacy is important to us. Please review our Privacy Policy for details on how we handle your information.</p>

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

export default Terms;