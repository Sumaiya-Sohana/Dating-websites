import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Heart, Sparkles } from 'lucide-react';

interface CountdownProps {
  dateStr: string; // YYYY-MM-DD
  timeStr: string; // e.g. "6:30 PM"
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isTodayOrPast: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ dateStr, timeStr }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isTodayOrPast: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!dateStr) return;

      // Parse timeStr like "6:30 PM"
      let hours = 18;
      let minutes = 30;
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        let h = parseInt(match[1], 10);
        const m = parseInt(match[2], 10);
        const period = match[3].toUpperCase();
        if (period === 'PM' && h < 12) h += 12;
        if (period === 'AM' && h === 12) h = 0;
        hours = h;
        minutes = m;
      }

      const [y, mo, d] = dateStr.split('-').map(Number);
      const targetTime = new Date(y, mo - 1, d, hours, minutes, 0).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isTodayOrPast: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const remHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const remMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const remSeconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours: remHours,
        minutes: remMinutes,
        seconds: remSeconds,
        isTodayOrPast: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [dateStr, timeStr]);

  if (timeLeft.isTodayOrPast) {
    return (
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-center shadow-xl shadow-rose-300 animate-pulse-glow">
        <Sparkles className="w-8 h-8 mx-auto mb-2 fill-white" />
        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold mb-1 tracking-wide">
          TODAY IS THE DAY! ❤️
        </h3>
        <p className="text-rose-100 text-sm font-sans">
          Put on your brightest smile, our date has arrived!
        </p>
      </div>
    );
  }

  const units = [
    { label: 'Days', val: timeLeft.days },
    { label: 'Hours', val: timeLeft.hours },
    { label: 'Minutes', val: timeLeft.minutes },
    { label: 'Seconds', val: timeLeft.seconds },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200/80 shadow-md text-center">
      <div className="flex items-center justify-center gap-1.5 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
        <Clock className="w-3.5 h-3.5" />
        <span>Counting down to our date... ❤️</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto my-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="p-2 sm:p-3 rounded-2xl bg-white border border-rose-100 shadow-2xs flex flex-col items-center"
          >
            <span className="font-serif text-2xl sm:text-3xl font-black text-rose-950">
              {String(u.val).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-rose-700 font-semibold uppercase">
              {u.label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 font-sans mt-2">
        Every second brings us closer together 💕
      </p>
    </div>
  );
};
