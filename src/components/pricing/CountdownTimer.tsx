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
      const endDate = new Date('2023-11-30T23:59:59');
      const now = new Date();
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
      <p className="text-lg font-semibold mb-2">Limited Time Offer Ends In:</p>
      <div className="flex justify-center gap-4 text-2xl font-bold">
        <div>
          <span>{timeLeft.days}</span>
          <span className="text-sm font-normal ml-1">days</span>
        </div>
        <div>
          <span>{timeLeft.hours}</span>
          <span className="text-sm font-normal ml-1">hours</span>
        </div>
        <div>
          <span>{timeLeft.minutes}</span>
          <span className="text-sm font-normal ml-1">min</span>
        </div>
        <div>
          <span>{timeLeft.seconds}</span>
          <span className="text-sm font-normal ml-1">sec</span>
        </div>
      </div>
    </div>
  );
};