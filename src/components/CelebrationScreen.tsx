import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Shirt,
  Utensils,
  Compass,
  Bookmark,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { DateState } from '../types';
import { Countdown } from './Countdown';
import { DateChecklist } from './DateChecklist';
import { RomanticConfirmationCard } from './RomanticConfirmationCard';
import { triggerBigCelebration, triggerHeartShower } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';

interface CelebrationScreenProps {
  state: DateState;
  onToggleChecklist: (key: string) => void;
  onAddCustomChecklist: (item: string) => void;
  onStartOver: () => void;
  onUpdateWhatsAppNumber?: (phone: string) => void;
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  state,
  onToggleChecklist,
  onAddCustomChecklist,
  onStartOver,
}) => {
  useEffect(() => {
    triggerBigCelebration();
    romanticAudio.playChime('high');

    const timeout = setTimeout(() => {
      triggerHeartShower();
    }, 1800);

    return () => clearTimeout(timeout);
  }, []);

  const formattedDate = state.selectedDate
    ? (() => {
        const [y, m, d] = state.selectedDate.split('-').map(Number);
        const dObj = new Date(y, m - 1, d);
        return dObj.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      })()
    : 'Upcoming Romantic Day';

  const allFoodItems = [
    ...state.foods,
    ...state.desserts,
    ...state.drinks,
    ...(state.customFood ? [state.customFood] : []),
  ];

  const q1Text =
    state.likedMe === 'yes'
      ? 'Yes, I do! 💕'
      : state.likedMe === 'no'
      ? 'No 💔 (Wait, really? 🥺)'
      : state.likedMe === 'maybe'
      ? 'Maybe 😳'
      : 'Answered';

  const q2Text =
    state.lovesMe === 'of_course'
      ? 'Of course! 🥰💖'
      : state.lovesMe === 'yes'
      ? 'Yes, I do! ❤️'
      : state.lovesMe === 'no'
      ? 'No 💔 (Ouch! 🥺)'
      : state.lovesMe === 'maybe'
      ? 'Maybe... 🙈'
      : 'Answered';

  const q3Text =
    state.wantsDate === 'yes'
      ? 'Yes, Absolutely! 🌹'
      : state.wantsDate === 'no'
      ? 'No 💔 (Wait, really? 🥺)'
      : state.wantsDate === 'maybe'
      ? 'Maybe... 🙈'
      : 'Answered';

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Celebration Main Hero Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
        className="relative bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-3xl p-8 sm:p-12 border-2 border-rose-300 shadow-2xl text-center overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-400/30 via-pink-400/30 to-amber-300/20 blur-xl -z-10 animate-pulse-glow" />

        {/* Animated Double Heart */}
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-600 flex items-center justify-center text-white shadow-xl shadow-rose-300 animate-bounce">
            <Heart className="w-12 h-12 fill-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-white text-rose-500 flex items-center justify-center shadow-md border-2 border-rose-200">
            <Sparkles className="w-5 h-5 fill-rose-300" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4 text-rose-500" /> Officially Confirmed
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-rose-600 font-black tracking-tight mb-4 animate-pulse">
          💖 IT'S OFFICIALLY A DATE! 💖
        </h1>

        <blockquote className="font-serif text-lg sm:text-2xl text-rose-950 font-medium max-w-lg mx-auto leading-relaxed mb-8 px-4 py-3 border-y border-rose-200/80">
          "One day. Two people. One beautiful memory waiting to happen."
        </blockquote>

        {/* Date Quick Badge */}
        <div className="inline-block p-4 rounded-2xl bg-white/90 border border-rose-200 shadow-sm text-center">
          <span className="text-xs text-rose-700 font-semibold block uppercase">
            Reserved On Our Calendar
          </span>
          <span className="font-serif text-xl sm:text-2xl font-bold text-rose-950">
            {formattedDate} at {state.selectedTime}
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">
            📍 {state.selectedPlace}
          </span>
        </div>
      </motion.div>

      {/* Live Countdown Section */}
      <Countdown dateStr={state.selectedDate} timeStr={state.selectedTime} />

      {/* Love Questions Answers Card */}
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-lg">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-950 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />
          Love Questions & Her Answers 💕
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
            <span className="text-xs font-semibold text-rose-600 block mb-1">
              Q1: Do you like me? 🥺
            </span>
            <span className="font-bold text-base sm:text-lg text-rose-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {q1Text}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
            <span className="text-xs font-semibold text-rose-600 block mb-1">
              Q2: Do you love me? 💖
            </span>
            <span className="font-bold text-base sm:text-lg text-rose-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {q2Text}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
            <span className="text-xs font-semibold text-rose-600 block mb-1">
              Q3: Go on a date? 🌹
            </span>
            <span className="font-bold text-base sm:text-lg text-rose-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {q3Text}
            </span>
          </div>
        </div>
      </div>

      {/* Full Date Details Summary Card */}
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-lg">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-950 mb-4 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-rose-500" />
          Our Date Master Plan
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
          <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100">
            <span className="text-xs font-semibold text-rose-700 uppercase block mb-1">
              👗 Dress Code & Palette
            </span>
            <p className="font-medium text-slate-800">
              {state.dressCode} • {state.matchingColor}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100">
            <span className="text-xs font-semibold text-rose-700 uppercase block mb-1">
              ✨ Vibe & Mood
            </span>
            <p className="font-medium text-slate-800">
              {state.dateVibes.join(', ')} {state.mood ? `• Mood: ${state.mood}` : ''}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 sm:col-span-2">
            <span className="text-xs font-semibold text-rose-700 uppercase block mb-1">
              🎯 Planned Activities
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {state.activities.map((a) => (
                <span
                  key={a}
                  className="px-2.5 py-1 rounded-full bg-white text-rose-900 border border-rose-200 text-xs font-medium"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 sm:col-span-2">
            <span className="text-xs font-semibold text-rose-700 uppercase block mb-1">
              🍕 Food & Drinks Lineup
            </span>
            <p className="font-medium text-slate-800">
              {allFoodItems.length > 0 ? allFoodItems.join(', ') : 'Surprise treats'}
            </p>
          </div>

          {state.loveNote && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 sm:col-span-2">
              <span className="text-xs font-semibold text-amber-800 uppercase block mb-1">
                💌 Sealed Love Note
              </span>
              <p className="font-serif italic text-rose-950 text-base">
                "{state.loveNote}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Preparation Checklist */}
      <DateChecklist
        checklist={state.checklist}
        customChecklist={state.customChecklist}
        onToggleItem={onToggleChecklist}
        onAddCustomItem={onAddCustomChecklist}
      />

      {/* Romantic Confirmation Letter & WhatsApp details */}
      <RomanticConfirmationCard state={state} />

      {/* Bottom Start Over or Replan Button */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onStartOver}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Plan Another Date or Start Over</span>
        </button>
      </div>
    </div>
  );
};
