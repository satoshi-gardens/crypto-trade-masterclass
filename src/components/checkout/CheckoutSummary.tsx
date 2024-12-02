interface CheckoutSummaryProps {
  courseTitle: string;
  packageType: string;
  paymentType: string;
  validatedPrice: number;
  referralCode?: string | null;
}

export const CheckoutSummary = ({
  courseTitle,
  packageType,
  paymentType,
  validatedPrice,
  referralCode
}: CheckoutSummaryProps) => {
  const originalPrice = referralCode ? validatedPrice / 0.9 : validatedPrice;
  const savings = referralCode ? originalPrice - validatedPrice : 0;

  const formatPrice = (price: number) => {
    return price ? price.toLocaleString() : '0';
  };

  return (
    <div className="bg-accent/10 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">Course Summary</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Selected Course:</span> {courseTitle}</p>
        <p><span className="font-medium">Package:</span> {packageType}</p>
        <p>
          <span className="font-medium">Payment Type:</span> {paymentType === 'annual' ? 'One-time Payment' : 'Monthly Payments'}
        </p>
        {referralCode ? (
          <>
            <p>
              <span className="font-medium">Original Price:</span>{" "}
              <span className="line-through">CHF {formatPrice(originalPrice)}</span>
            </p>
            <p>
              <span className="font-medium">Discounted Price:</span>{" "}
              <span className="text-primary">CHF {formatPrice(validatedPrice)}</span>
            </p>
            <p className="text-primary">
              You save CHF {formatPrice(savings)} with your referral discount!
            </p>
          </>
        ) : (
          <p><span className="font-medium">Price:</span> CHF {formatPrice(validatedPrice)}</p>
        )}
        <p className="text-primary font-medium mt-4">
          Please complete payment within 7 days to secure your spot.
        </p>
      </div>
    </div>
  );
};