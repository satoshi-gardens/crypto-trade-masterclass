import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";

const Terms = () => {
  const breadcrumbItems = [
    { label: "Terms of Service", href: "/terms" }
  ];

  return (
    <PageLayout>
      <Breadcrumb items={breadcrumbItems} />
      <Hero
        title="Terms of Service"
        subtitle="Our commitment to you and what we expect in return"
        backgroundClass="bg-[#F8F8F8]"
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
              Your privacy is important to us. Our services comply with GDPR and other applicable data protection laws. By using our services, you consent to our collection and use of your data as described in our Privacy Policy.
            </p>
            <p className="mb-4">
              We use cookies and similar tracking technologies to enhance your experience. You can manage your cookie preferences through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Use License</h2>
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
            <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
            <p className="mb-4">
              Our materials are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
            <p className="mb-4">
              In no event shall we be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
            <p className="mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of Switzerland, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Terms;