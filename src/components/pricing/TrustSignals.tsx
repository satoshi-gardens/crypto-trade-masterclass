export const TrustSignals = () => {
  return (
    <div className="bg-gray-50 py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Why Choose Our Program?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Structured Learning</h4>
              <p className="text-gray-600">
                Clear, step-by-step curriculum designed for optimal learning and retention
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Expert Guidance</h4>
              <p className="text-gray-600">
                Learn from experienced traders who understand market dynamics
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Practical Application</h4>
              <p className="text-gray-600">
                Real-world trading scenarios and hands-on experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};