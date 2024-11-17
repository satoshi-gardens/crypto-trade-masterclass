import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";

const Privacy = () => {
  const breadcrumbItems = [
    { label: "Privacy Policy", href: "/privacy" }
  ];

  return (
    <PageLayout>
      <Breadcrumb items={breadcrumbItems} />
      <Hero
        title="Privacy Policy"
        subtitle="How we protect and handle your data"
        backgroundClass="bg-accent"
      />
      <div className="container mx-auto px-6 py-12">
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. GDPR Compliance Statement</h2>
            <p className="mb-4">
              We are committed to processing data in accordance with our responsibilities under the GDPR and other applicable data protection laws. This policy explains how we collect, store, and use your personal data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Cookie Policy</h2>
            <p className="mb-4">
              Our website uses cookies and similar technologies to enhance your browsing experience. We use:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies to understand how visitors use our site</li>
              <li>Preference cookies to remember your settings</li>
            </ul>
            <p>You can control cookie settings through your browser preferences.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Account information (name, email, password)</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Course progress and interaction data</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Your Data Rights</h2>
            <p className="mb-4">
              Under GDPR, you have the following rights:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
            <p className="mb-4">
              We retain your personal data only for as long as necessary to provide you with our services and as described in this privacy policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p>
              For any privacy-related questions or to exercise your data rights, please contact our Data Protection Officer at:
              privacy@cryptotrading4profits.com
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;