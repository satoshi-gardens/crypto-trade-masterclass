import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";

const Privacy = () => {
  const breadcrumbItems = [
    { label: "Privacy Policy", href: "/privacy" }
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
        title="Privacy Policy"
        subtitle="How we protect and handle your data"
        backgroundClass="bg-accent"
        buttonText="Start Your Journey"
        onButtonClick={handleStartJourney}
        showButton={true}
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
            <h2 className="text-2xl font-semibold mb-4">2. Analytics and Tracking</h2>
            <p className="mb-4">
              We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered relating to our website is used to create reports about the use of our website.
            </p>
            <p className="mb-4">
              Google Analytics collects information such as:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your IP address (anonymized)</li>
              <li>The pages you visit on our website</li>
              <li>How long you spend on each page</li>
              <li>How you got to the site</li>
              <li>What you click on while you're visiting the site</li>
            </ul>
            <p className="mb-4">
              You can opt-out of Google Analytics tracking by using the Google Analytics Opt-out Browser Add-on or by managing your cookie preferences in your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Cookie Policy</h2>
            <p className="mb-4">
              Our website uses cookies and similar technologies to enhance your browsing experience. We use:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies (including Google Analytics) to understand how visitors use our site</li>
              <li>Preference cookies to remember your settings</li>
            </ul>
            <p>You can control cookie settings through your browser preferences.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Account information (name, email, password)</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Course progress and interaction data</li>
              <li>Communication preferences</li>
              <li>Usage data through analytics tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Your Data Rights</h2>
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
            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
            <p className="mb-4">
              We retain your personal data only for as long as necessary to provide you with our services and as described in this privacy policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p>
              For any privacy-related questions or to exercise your data rights, please contact our Data Protection Officer at:
              privacy@bit2big.com
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;