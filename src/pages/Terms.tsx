import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";

const Terms = () => {
  const breadcrumbItems = [
    { label: "Terms of Service", href: "/terms" }
  ];

  const handleStartJourney = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageLayout>
      <Breadcrumb items={breadcrumbItems} />
      <Hero
        title="Terms of Service"
        subtitle="Our commitment to you and what we expect in return"
        backgroundClass="bg-[#F8F8F8]"
        buttonText="Start Your Journey"
        onButtonClick={handleStartJourney}
        showButton={true}
      />
      <div className="container mx-auto px-6 py-12">
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of the terms, you may not access our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Privacy and Data Protection</h2>
            <p className="mb-4">
              Your privacy is important to us. Our services comply with GDPR, Swiss Federal Act on Data Protection (FADP), and other applicable data protection laws. By using our services, you consent to our collection and use of your data as described in our Privacy Policy.
            </p>
            <p className="mb-4">
              We use cookies and similar tracking technologies to enhance your experience. You can manage your cookie preferences through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Special Offers and Discounts</h2>
            <p className="mb-4">
              All special offers, promotions, and discounts are:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Subject to availability and offered on a first-come, first-served basis</li>
              <li>Valid only for the specified time period</li>
              <li>Non-transferable and cannot be combined with other offers or discounts under any circumstances</li>
              <li>Subject to change or withdrawal without prior notice</li>
              <li>Applicable only to new registrations during the promotional period</li>
            </ul>
            <p className="mb-4 text-gray-700">
              <strong>Important Note:</strong> Discounts, including referral discounts and promotional offers, cannot be combined or stacked. Only one discount type can be applied per purchase.
            </p>
            <p className="mb-4">
              In accordance with Swiss and German consumer protection laws, all prices are displayed including VAT where applicable. The right of withdrawal (Widerrufsrecht) applies as per Art. 40a et seq. OR (Swiss Code of Obligations) and § 312g BGB (German Civil Code).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Use License</h2>
            <p className="mb-4">
              Upon purchasing our courses, we grant you a limited, non-exclusive, non-transferable license to access and use the course materials for personal, non-commercial purposes.
            </p>
            <p className="mb-4">
              You may not:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes</li>
              <li>Transfer the materials to another person</li>
              <li>Share your account credentials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Disclaimer</h2>
            <p className="mb-4">
              Our materials are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Limitations</h2>
            <p className="mb-4">
              In no event shall we be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
            <p className="mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of Switzerland, and you irrevocably submit to the exclusive jurisdiction of the courts in that location. For customers in Germany, mandatory consumer protection laws may provide additional rights.
            </p>
            <p className="mb-4">
              For EU consumers: According to EU consumer protection law, you have the right to cancel your purchase within 14 days without giving any reason (cooling-off period). However, this right expires once the service has been fully performed if you expressly consented to the performance beginning during the cooling-off period and acknowledged that you would lose your right to cancel once the service was fully performed.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Terms;