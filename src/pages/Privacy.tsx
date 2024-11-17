import PageLayout from "@/components/PageLayout";

const Privacy = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, including when you:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Create an account</li>
              <li>Purchase a course</li>
              <li>Contact our support team</li>
              <li>Subscribe to our newsletter</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and improve our services</li>
              <li>Process your transactions</li>
              <li>Send you updates and marketing communications</li>
              <li>Protect against fraud and unauthorized access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Service providers who assist in our operations</li>
              <li>Professional advisors</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              privacy@cryptotrading4profits.com
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;