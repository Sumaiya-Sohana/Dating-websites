import React from 'react';
import { motion } from 'motion/react';
import { Clock, Sunset, Sun, Moon, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface TimeSelectorProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
  onNext: () => void;
}

const TIME_SLOTS = [
  { time: '10:00 AM', label: 'Morning Breeze', icon: Sun, isSunset: false },
  { time: '12:00 PM', label: 'Sunny Noon', icon: Sun, isSunset: false },
  { time: '2:00 PM', label: 'Afternoon Tea', icon: Sun, isSunset: false },
  { time: '4:00 PM', label: 'Pre-Evening Glow', icon: Sun, isSunset: false },
  { time: '5:30 PM', label: 'Golden Hour / Sunset', icon: Sunset, isSunset: true },
  { time: '6:30 PM', label: 'Sunset Magic', icon: Sunset, isSunset: true },
  { time: '7:00 PM', label: 'Twilight Romantic', icon: Moon, isSunset: false },
  { time: '8:00 PM', label: 'Starry Night', icon: Moon, isSunset: false },
];

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedTime,
  onSelectTime,
  onNext,
}) => {
  const handleSelect = (t: string) => {
    romanticAudio.playChime('medium');
    onSelectTime(t);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5 text-rose-500" /> Perfect Timing
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-bold mb-2">
            What time should our little adventure begin? ⏰
          </h2>
          <p className="text-slate-600 font-sans text-sm">
            Choose the moment our day starts
          </p>
        </div>

        {/* Time Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
          {TIME_SLOTS.map((slot) => {
            const isSelected = selectedTime === slot.time;
            const Icon = slot.icon;

            return (
              <motion.button
                key={slot.time}
                type="button"
                id={`time-btn-${slot.time.replace(/[: ]/g, '-').toLowerCase()}`}
                onClick={() => handleSelect(slot.time)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 text-left cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-500 shadow-lg shadow-rose-300'
                    : 'bg-white/90 border-slate-200/90 hover:border-rose-300 hover:bg-rose-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : slot.isSunset
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span
                      className={`text-lg font-bold block ${
                        isSelected ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {slot.time}
                    </span>
                    <span
                      className={`text-xs ${
                        isSelected ? 'text-rose-100' : 'text-slate-500'
                      }`}
                    >
                      {slot.label}
                    </span>
                  </div>
                </div>

                {slot.isSunset && (
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                      isSelected
                        ? 'bg-white text-rose-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    <Sunset className="w-3 h-3" /> Sunset vibe
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            id="time-next-btn"
            disabled={!selectedTime}
            onClick={onNext}
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base shadow-lg transition-all duration-200 ${
              selectedTime
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300 hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Choose Where To Go</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
