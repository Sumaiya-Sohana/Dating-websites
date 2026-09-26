import React from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Utensils,
  Sparkles,
  Edit2,
  Heart,
  CheckCircle2,
  Shirt,
  Compass
} from 'lucide-react';
import { DateState, Step } from '../types';

interface DateReviewProps {
  state: DateState;
  onEditSection: (step: Step) => void;
  onConfirmDate: () => void;
  onUpdateWhatsAppNumber?: (phone: string) => void;
}

export const DateReview: React.FC<DateReviewProps> = ({
  state,
  onEditSection,
  onConfirmDate,
}) => {
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
    : 'Not selected';

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
      ? 'No 💔'
      : state.likedMe === 'maybe'
      ? 'Maybe 😳'
      : 'Not answered';

  const q2Text =
    state.lovesMe === 'of_course'
      ? 'Of course! 🥰💖'
      : state.lovesMe === 'yes'
      ? 'Yes, I do! ❤️'
      : state.lovesMe === 'no'
      ? 'No 💔'
      : state.lovesMe === 'maybe'
      ? 'Maybe... 🙈'
      : 'Not answered';

  const q3Text =
    state.wantsDate === 'yes'
      ? 'Yes, Absolutely! 🌹'
      : state.wantsDate === 'no'
      ? 'No 💔'
      : state.wantsDate === 'maybe'
      ? 'Maybe... 🙈'
      : 'Not answered';

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" /> Final Review
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-bold mb-2">
            One Last Look... 👀❤️
          </h2>
          <p className="text-slate-600 font-sans text-sm">
            Review your answers and date plans before confirming
          </p>
        </div>

        {/* Love Questions Answers Card */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-rose-50/80 to-pink-50/80 border border-rose-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="font-serif font-bold text-rose-950 text-base flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-100" />
              Love Questions Answers
            </span>
            <button
              type="button"
              id="review-edit-questions-btn"
              onClick={() => onEditSection('questions')}
              className="px-3 py-1 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-100/60 border border-rose-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-white/90 border border-rose-100">
              <span className="text-slate-500 block mb-0.5">Do you like me? 🥺</span>
              <span className="font-bold text-rose-950 text-sm">{q1Text}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/90 border border-rose-100">
              <span className="text-slate-500 block mb-0.5">Do you love me? 💖</span>
              <span className="font-bold text-rose-950 text-sm">{q2Text}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/90 border border-rose-100">
              <span className="text-slate-500 block mb-0.5">Go on a date? 🌹</span>
              <span className="font-bold text-rose-950 text-sm">{q3Text}</span>
            </div>
          </div>
        </div>

        {/* Review list */}
        <div className="space-y-3 mb-8">
          {/* Date item */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-rose-100 shadow-xs hover:border-rose-300 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Date</span>
                <span className="font-serif font-bold text-rose-950 text-base">
                  {formattedDate}
                </span>
              </div>
            </div>
            <button
              type="button"
              id="review-edit-date-btn"
              onClick={() => onEditSection('date')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Time item */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-rose-100 shadow-xs hover:border-rose-300 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Time</span>
                <span className="font-serif font-bold text-rose-950 text-base">
                  {state.selectedTime}
                </span>
              </div>
            </div>
            <button
              type="button"
              id="review-edit-time-btn"
              onClick={() => onEditSection('time')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Place item */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-rose-100 shadow-xs hover:border-rose-300 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Place</span>
                <span className="font-serif font-bold text-rose-950 text-base">
                  {state.selectedPlace}
                </span>
              </div>
            </div>
            <button
              type="button"
              id="review-edit-place-btn"
              onClick={() => onEditSection('place')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Vibe & Dress Code item */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-rose-100 shadow-xs hover:border-rose-300 transition-all">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Shirt className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 block">Dress & Palette</span>
                <span className="font-serif font-bold text-rose-950 text-sm truncate block">
                  {state.dressCode} ({state.matchingColor})
                </span>
              </div>
            </div>
            <button
              type="button"
              id="review-edit-dress-btn"
              onClick={() => onEditSection('dress_code')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Activities item */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-rose-100 shadow-xs hover:border-rose-300 transition-all">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 block">Activities</span>
                <span className="font-serif font-bold text-rose-950 text-sm truncate block">
                  {state.activities.join(', ')}
                </span>
              </div>
            </div>
            <button
              type="button"
              id="review-edit-activities-btn"
              onClick={() => onEditSection('activities')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Food item */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-rose-100 shadow-xs hover:border-rose-300 transition-all">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 block">Food & Drinks</span>
                <span className="font-serif font-bold text-rose-950 text-sm truncate block">
                  {allFoodItems.length > 0 ? allFoodItems.join(', ') : 'None chosen'}
                </span>
              </div>
            </div>
            <button
              type="button"
              id="review-edit-food-btn"
              onClick={() => onEditSection('food')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Confirmation CTA Button */}
        <div className="text-center pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            id="confirm-date-btn"
            onClick={onConfirmDate}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-lg shadow-xl shadow-rose-400/50 hover:shadow-rose-500/60 ring-4 ring-rose-200 transition-all cursor-pointer inline-flex items-center justify-center gap-3"
          >
            <Heart className="w-6 h-6 fill-white" />
            <span>💖 Confirm Our Date</span>
          </motion.button>
          <p className="mt-3 text-xs text-rose-800/80 font-medium">
            💬 A sealed confirmation message will be sent directly to WhatsApp (
            <strong className="text-rose-950 font-semibold">+880 1724-837714</strong>)
          </p>
        </div>
      </div>
    </div>
  );
};
