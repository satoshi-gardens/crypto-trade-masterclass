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
  const displayReferralCode = referralCode || "CT4P4bit2BIG";

  return (
    <div className="bg-accent/10 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">Course Summary</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Selected Course:</span> {courseTitle}</p>
        <p>
          <span className="font-medium">Payment Type:</span> {paymentType === 'annual' ? 'One-time Payment' : 'Monthly Payments'}
        </p>
        <p>
          <span className="font-medium">Referral Code:</span> {displayReferralCode}
        </p>
        {referralCode ? (
          <>
            <p>
              <span className="font-medium">Original Price:</span>{" "}
              <span className="line-through">CHF {originalPrice.toLocaleString()}</span>
            </p>
            <p>
              <span className="font-medium">Discounted Price:</span>{" "}
              <span className="text-primary">CHF {validatedPrice.toLocaleString()}</span>
            </p>
            <p className="text-primary">
              You save CHF {savings.toLocaleString()} with your referral discount!
            </p>
          </>
        ) : (
          <p><span className="font-medium">Price:</span> CHF {validatedPrice.toLocaleString()}</p>
        )}
        <p className="text-primary font-medium mt-4">
          Please complete payment within 7 days to secure your spot.
        </p>
      </div>
    </div>
  );
};