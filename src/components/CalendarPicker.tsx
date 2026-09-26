import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface CalendarPickerProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (dateStr: string) => void;
  onNext: () => void;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  selectedDate,
  onSelectDate,
  onNext,
}) => {
  // Current reference date (Sept 2026 according to container metadata, or fallback to system today)
  const today = new Date(2026, 8, 8); // Sept 8, 2026
  
  // View month & year
  const initialViewDate = selectedDate ? new Date(selectedDate) : today;
  const [viewDate, setViewDate] = useState<Date>(
    new Date(initialViewDate.getFullYear(), initialViewDate.getMonth(), 1)
  );

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in current view month
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  // Navigation handlers
  const prevMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };
  const nextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const isToday = (day: number) => {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  const isPast = (day: number) => {
    const candidate = new Date(viewYear, viewMonth, day, 23, 59, 59);
    return candidate.getTime() < today.setHours(0, 0, 0, 0);
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const [selY, selM, selD] = selectedDate.split('-').map(Number);
    return selY === viewYear && selM - 1 === viewMonth && selD === day;
  };

  const handleDayClick = (day: number) => {
    if (isPast(day)) return;
    const yyyy = viewYear;
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    romanticAudio.playChime('high');
    onSelectDate(dateStr);
  };

  // Format selected date nicely
  const formattedSelected = selectedDate ? (() => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  })() : null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <CalendarIcon className="w-3.5 h-3.5 text-rose-500" /> Save The Date
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-bold mb-2">
            When should we make this memory? 📅❤️
          </h2>
          <p className="text-slate-600 font-sans text-sm">
            Pick a day for our special date
          </p>
        </div>

        {/* Calendar Box */}
        <div className="bg-rose-50/50 rounded-2xl p-4 sm:p-6 border border-rose-100/80 mb-6">
          {/* Month Header & Controls */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={prevMonth}
              id="calendar-prev-month-btn"
              className="p-2 rounded-full hover:bg-white text-rose-700 transition-colors shadow-2xs cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-rose-950">
              {monthNames[viewMonth]} {viewYear}
            </h3>

            <button
              onClick={nextMonth}
              id="calendar-next-month-btn"
              className="p-2 rounded-full hover:bg-white text-rose-700 transition-colors shadow-2xs cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center mb-2">
            {dayNames.map((d) => (
              <span key={d} className="text-xs font-semibold text-rose-800/70 uppercase">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 sm:h-12" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const disabled = isPast(day);
              const selected = isSelected(day);
              const todayMark = isToday(day);

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  id={`calendar-day-${day}`}
                  disabled={disabled}
                  onClick={() => handleDayClick(day)}
                  className={`relative h-10 sm:h-12 rounded-2xl flex flex-col items-center justify-center font-medium text-sm transition-all duration-200 ${
                    disabled
                      ? 'text-slate-300 cursor-not-allowed'
                      : selected
                      ? 'bg-rose-500 text-white font-bold shadow-lg shadow-rose-300 scale-105 z-10'
                      : todayMark
                      ? 'bg-white text-rose-900 border-2 border-rose-300 hover:bg-rose-100/60 font-bold'
                      : 'bg-white/80 text-slate-700 hover:bg-rose-100 hover:text-rose-900 shadow-2xs'
                  }`}
                >
                  {/* Heart badge background for selected date */}
                  {selected && (
                    <motion.div
                      layoutId="selectedHeartDate"
                      className="absolute inset-0 -z-0 flex items-center justify-center pointer-events-none"
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    >
                      <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-rose-500 text-rose-500 opacity-95" />
                    </motion.div>
                  )}
                  <span className="relative z-10">{day}</span>
                  {todayMark && !selected && (
                    <span className="relative z-10 w-1 h-1 rounded-full bg-rose-500 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected date feedback quote */}
        {selectedDate ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-4 rounded-2xl bg-rose-100/70 border border-rose-200 mb-6"
          >
            <p className="font-serif text-lg sm:text-xl text-rose-900 font-semibold mb-1">
              {formattedSelected}
            </p>
            <p className="text-sm font-romantic text-2xl text-rose-600">
              "Perfect! I'll remember this day. ❤️"
            </p>
          </motion.div>
        ) : (
          <div className="text-center p-3 text-slate-500 text-sm italic mb-6">
            Please select a date on the calendar above
          </div>
        )}

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            id="date-next-btn"
            disabled={!selectedDate}
            onClick={onNext}
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base shadow-lg transition-all duration-200 ${
              selectedDate
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300 hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Choose What Time</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
