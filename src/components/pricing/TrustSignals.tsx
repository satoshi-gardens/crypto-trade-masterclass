export const TrustSignals = () => {
  return (
    <div className="bg-gray-50 py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Trusted by Industry Leaders</h3>
          <div className="flex justify-center items-center gap-8 mb-8 grayscale opacity-60">
            <img src="/logos/forbes.svg" alt="Forbes" className="h-8" />
            <img src="/logos/bloomberg.svg" alt="Bloomberg" className="h-8" />
            <img src="/logos/cryptocon.svg" alt="CryptoCon" className="h-8" />
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg mb-4">
              "95% of our graduates achieve consistent profitability within their first year"
            </p>
            <p className="text-lg text-primary font-semibold">
              127% average ROI reported by our students in 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};