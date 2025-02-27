
import { Helmet } from "react-helmet";
import { CTAButton } from "@/components/ui/cta-button";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { CountdownTimer } from "@/components/pricing/CountdownTimer";
import { TrustSignals } from "@/components/pricing/TrustSignals";
import { PricingCard } from "@/components/pricing/PricingCard";
import { CourseStructure } from "@/components/course/CourseStructure";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import { useState } from "react";
import { PaymentToggle } from "@/components/pricing/PaymentToggle";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Cryptocurrency Trading Masterclass",
  "description": "Professioneller Kryptowährungshandelskurs in der Schweiz und Deutschland. Lernen Sie fortgeschrittene Handelsstrategien, technische Analyse und Risikomanagement von Dr. Michael Kiberu.",
  "provider": {
    "@type": "Organization",
    "name": "KY Connect",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zürich",
      "addressRegion": "ZH",
      "postalCode": "8005",
      "streetAddress": "Turbinenstrasse 31",
      "addressCountry": "CH"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "1800",
    "priceCurrency": "CHF",
    "availability": "https://schema.org/InStock",
    "validFrom": "2023-01-01",
    "category": "Kryptowährungsbildung"
  },
  "courseLanguage": ["de", "en"],
  "locationCreated": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zürich",
      "addressCountry": "Switzerland"
    }
  },
  "educationalCredentialAwarded": "Zertifikat im Kryptowährungshandel",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "87",
    "bestRating": "5",
    "worstRating": "1"
  }
};

const Home = () => {
  const [paymentType, setPaymentType] = useState<"monthly" | "annual">("monthly");

  const handleStartJourney = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <title>Krypto-Trading Kurse in Zürich & Online | Dr. Michael Kiberu</title>
        <meta name="description" content="Professionelle Krypto-Handelsausbildung in der Schweiz mit Dr. Michael Kiberu. Lernen Sie fortgeschrittene Handelsstrategien, technische Analyse und Risikomanagement." />
        <meta name="keywords" content="Krypto-Trading Kurs Zürich, Cryptocurrency Trading Schweiz, Bitcoin Ausbildung, Blockchain Kurse Deutsch, Krypto-Coach Michael Kiberu" />
      </Helmet>

      <Hero
        title="Meistern Sie den Krypto-Handel: Transformieren Sie Ihre finanzielle Zukunft"
        subtitle="Schließen Sie sich dem führenden Schweizer Trading-Programm an und lernen Sie, den Kryptomarkt mit Selbstvertrauen und Profitabilität zu navigieren"
        buttonText="Starten Sie Ihre Reise"
        onButtonClick={handleStartJourney}
      />

      <ValueProposition />

      {/* Standorte Sektion - Optimiert für lokale SEO */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Unsere Standorte in der Schweiz und Deutschland</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Zürich, Schweiz (Hauptsitz)</h3>
              <p className="mb-2"><strong>Adresse:</strong> Turbinenstrasse 31, 8005 Zürich</p>
              <p className="mb-2"><strong>Telefon:</strong> +41 123 456 789</p>
              <p className="mb-6"><strong>E-Mail:</strong> zurich@cryptocourse.bit2big.com</p>
              <p className="text-gray-600">
                Unser Hauptsitz in Zürich bietet persönliche Coaching-Sessions, Gruppenkurse und regelmäßige Krypto-Meetups für Anfänger und fortgeschrittene Trader.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Berlin, Deutschland</h3>
              <p className="mb-2"><strong>Adresse:</strong> Friedrichstraße 123, 10117 Berlin</p>
              <p className="mb-2"><strong>Telefon:</strong> +49 123 456 7890</p>
              <p className="mb-6"><strong>E-Mail:</strong> berlin@cryptocourse.bit2big.com</p>
              <p className="text-gray-600">
                Unser Berliner Standort bietet deutsche Online-Kurse und monatliche In-Person-Workshops für alle, die in Kryptowährungen investieren möchten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <PricingHeader />
          <CountdownTimer />
          <PaymentToggle paymentType={paymentType} onToggle={setPaymentType} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <PricingCard
              title="Online Training"
              monthlyPrice={1800}
              annualPrice={9720}
              description="Designed for independent learners who value flexibility and small-group dynamics."
              features={[
                "Group-focused virtual sessions (max 5 participants)",
                "Coach reachable for inquiries during group time",
                "Weekly live online sessions",
                "Interactive assignments and quizzes",
                "Community access for peer support"
              ]}
              maxStudents={5}
              paymentType={paymentType}
            />
            <PricingCard
              title="Premium (In-Person)"
              monthlyPrice={3240}
              annualPrice={17496}
              description="The ultimate personalized experience with Fast Track option to complete in 3.5 months."
              features={[
                "Fast Track option: Complete in 3.5 months",
                "Tailored one-on-one coaching with unlimited session access",
                "Signals provided from the second month",
                "Personal support outside regular sessions",
                "Direct phone access to trainer",
                "Lifetime access to premium resources"
              ]}
              isPopular={true}
              additionalHourlyRate={450}
              paymentType={paymentType}
            />
            <PricingCard
              title="Hybrid Training"
              monthlyPrice={2700}
              annualPrice={14580}
              description="A perfect balance of personal coaching and peer collaboration."
              features={[
                "Small-group in-person and online sessions",
                "Signals provided from the second month",
                "Monthly in-person sessions",
                "Weekly online group discussions",
                "Access to premium tools"
              ]}
              maxStudents={5}
              additionalHourlyRate={450}
              paymentType={paymentType}
            />
          </div>
        </div>
      </section>

      <TrustSignals />
      <CourseStructure />
      <TestimonialsSection />

      {/* FAQ Section for SEO */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Häufig gestellte Fragen</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Welche Vorkenntnisse benötige ich für den Kryptowährungskurs?</h3>
              <p className="text-gray-600">
                Keine Vorkenntnisse erforderlich. Unser Kurs ist sowohl für Anfänger als auch für fortgeschrittene Trader konzipiert. Sie lernen von Grund auf alle nötigen Kenntnisse, um erfolgreich mit Kryptowährungen zu handeln.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Wie lange dauert der Kryptowährungskurs?</h3>
              <p className="text-gray-600">
                Der Standardkurs dauert 6 Monate. Mit unserer Fast-Track-Option können Sie den Kurs jedoch in nur 3,5 Monaten abschließen.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Kann ich nach Abschluss des Kurses wirklich von meinen Trading-Gewinnen leben?</h3>
              <p className="text-gray-600">
                Mit der LOOP-Methode (Live On yOur Profits) lernen Sie, wie Sie Ihre Handelsgewinne maximieren und potenziell ein Einkommen aus dem Kryptohandel erzielen können. Die Ergebnisse variieren je nach Marktbedingungen, Kapital und konsequenter Anwendung der erlernten Strategien.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Ist der Kurs auch auf Deutsch verfügbar?</h3>
              <p className="text-gray-600">
                Ja, unser Krypto-Trading-Kurs wird sowohl auf Deutsch als auch auf Englisch angeboten. Sie können die Sprache wählen, die Ihnen am besten liegt.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Bieten Sie auch Kurse in Deutschland an?</h3>
              <p className="text-gray-600">
                Ja, neben unserem Hauptsitz in Zürich bieten wir auch Kurse in Berlin an. Zudem sind unsere Online-Kurse für Teilnehmer aus der gesamten DACH-Region zugänglich.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Bereit für den Einstieg in den Krypto-Handel?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schließen Sie sich unserer Community erfolgreicher Trader an und erlernen Sie die Strategien, 
            die Ihre finanzielle Zukunft transformieren können.
          </p>
          <CTAButton
            text="Starten Sie Ihre Reise"
            className="bg-white text-primary hover:bg-white/90"
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
