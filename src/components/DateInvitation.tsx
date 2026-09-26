import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Share2,
  Check,
  ArrowRight,
  Compass,
  Shirt,
  Utensils,
  PartyPopper
} from 'lucide-react';
import { DateState } from '../types';
import { romanticAudio } from '../utils/audio';

interface DateInvitationProps {
  state: DateState;
  onProceedToReview: () => void;
}

export const DateInvitation: React.FC<DateInvitationProps> = ({
  state,
  onProceedToReview,
}) => {
  const [copied, setCopied] = useState(false);

  // Format date nicely
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
    : 'A Special Day Soon';

  const allFoodItems = [
    ...state.foods,
    ...state.desserts,
    ...state.drinks,
    ...(state.customFood ? [state.customFood] : []),
  ];

  const handleCopyInvitation = () => {
    const text = `💕 YOU'RE INVITED TO OUR LITTLE DATE 💕\n\n📅 When: ${formattedDate}\n⏰ Time: ${state.selectedTime}\n📍 Place: ${state.selectedPlace}\n👗 Dress Code: ${state.dressCode} (${state.matchingColor})\n🎯 Activities: ${state.activities.join(', ')}\n🍕 Food: ${allFoodItems.join(', ')}\n🎶 Playlist: ${state.playlistPreference} ${state.favoriteSong ? `("${state.favoriteSong}")` : ''}\n\nFrom: Someone who wants to spend time with you ❤️`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      romanticAudio.playChime('high');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <PartyPopper className="w-3.5 h-3.5 text-rose-500" /> Formal Romantic Ticket
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-bold">
          Your Digital Date Invitation 🎟️
        </h2>
        <p className="text-slate-600 font-sans text-sm">
          A personalized pass for our unforgettable day
        </p>
      </div>

      {/* Luxury Invitation Card with Decorative Border */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-b from-[#fffbfc] via-white to-[#fff0f3] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-rose-300/80 mb-6 overflow-hidden"
      >
        {/* Ornate corner ornaments */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-rose-400" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-rose-400" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-rose-400" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-rose-400" />

        {/* Header */}
        <div className="text-center border-b border-rose-200/80 pb-6 mb-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center mb-3 shadow-md shadow-rose-300 animate-pulse">
            <Heart className="w-6 h-6 fill-white" />
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-rose-950 tracking-wider">
            💕 YOU'RE INVITED 💕
          </h1>
          <p className="font-romantic text-2xl sm:text-3xl text-rose-600 mt-1">
            To Our Little Date
          </p>
        </div>

        {/* Details Grid */}
        <div className="space-y-4 mb-6">
          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
              <div className="w-9 h-9 rounded-xl bg-white text-rose-600 flex items-center justify-center shadow-2xs">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wide block">
                  Date
                </span>
                <span className="font-serif font-bold text-sm sm:text-base text-rose-950">
                  {formattedDate}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
              <div className="w-9 h-9 rounded-xl bg-white text-rose-600 flex items-center justify-center shadow-2xs">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wide block">
                  Time
                </span>
                <span className="font-serif font-bold text-sm sm:text-base text-rose-950">
                  {state.selectedTime}
                </span>
              </div>
            </div>
          </div>

          {/* Place & Dress Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
              <div className="w-9 h-9 rounded-xl bg-white text-rose-600 flex items-center justify-center shadow-2xs">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wide block">
                  Place
                </span>
                <span className="font-serif font-bold text-sm sm:text-base text-rose-950">
                  {state.selectedPlace}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
              <div className="w-9 h-9 rounded-xl bg-white text-rose-600 flex items-center justify-center shadow-2xs">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wide block">
                  Dress Code
                </span>
                <span className="font-serif font-bold text-sm sm:text-base text-rose-950">
                  {state.dressCode} ({state.matchingColor})
                </span>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100">
            <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" /> Planned Activities
            </span>
            <div className="flex flex-wrap gap-1.5">
              {state.activities.map((act) => (
                <span
                  key={act}
                  className="px-2.5 py-1 rounded-full bg-white text-rose-900 border border-rose-200 text-xs font-medium shadow-2xs"
                >
                  {act}
                </span>
              ))}
            </div>
          </div>

          {/* Food and Vibe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
              <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <Utensils className="w-3.5 h-3.5 text-rose-500" /> Food & Treats
              </span>
              <p className="text-xs text-rose-950 font-medium line-clamp-2">
                {allFoodItems.length > 0 ? allFoodItems.join(', ') : 'Surprise snacks'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
              <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <Compass className="w-3.5 h-3.5 text-rose-500" /> Vibe & Mood
              </span>
              <p className="text-xs text-rose-950 font-medium line-clamp-2">
                {state.dateVibes.join(', ')} {state.mood ? `• Mood: ${state.mood}` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="pt-4 border-t border-rose-200/80 text-center">
          <p className="font-serif italic text-base sm:text-lg text-rose-900 font-semibold">
            "From: Someone who wants to spend time with you ❤️"
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          id="copy-invitation-btn"
          onClick={handleCopyInvitation}
          className="w-full sm:w-auto px-5 py-3 rounded-full bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 font-medium text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Invitation Copied! 💕</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-rose-500" />
              <span>Copy Invitation Text</span>
            </>
          )}
        </button>

        <button
          id="proceed-to-review-btn"
          onClick={onProceedToReview}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base shadow-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <span>One Last Look (Review)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
