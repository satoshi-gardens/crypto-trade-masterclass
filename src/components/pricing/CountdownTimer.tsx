import { useEffect, useState } from "react";

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const startDate = new Date('2024-11-15T00:00:00');
      const endDate = new Date('2024-12-21T23:59:59');
      const now = new Date();

      // Only start countdown if we're within the date range
      if (now < startDate) {
        return; // Don't start countdown yet
      }

      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mb-8 animate-fade-in">
      <p className="text-lg font-semibold mb-4">Limited Time Offer Ends In:</p>
      <div className="bg-[#F8F8F8] p-6 rounded-lg shadow-sm inline-block">
        <div className="flex justify-center gap-6 text-3xl font-bold">
          <div className="flex flex-col items-center">
            <span className="text-primary">{timeLeft.days}</span>
            <span className="text-sm font-normal text-gray-600">days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-primary">{timeLeft.hours}</span>
            <span className="text-sm font-normal text-gray-600">hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-primary">{timeLeft.minutes}</span>
            <span className="text-sm font-normal text-gray-600">min</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-primary">{timeLeft.seconds}</span>
            <span className="text-sm font-normal text-gray-600">sec</span>
          </div>
        </div>
      </div>
    </div>
  );
};