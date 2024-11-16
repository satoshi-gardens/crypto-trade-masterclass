import { useEffect, useState } from "react";

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 22,
    hours: 12,
    minutes: 45,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

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