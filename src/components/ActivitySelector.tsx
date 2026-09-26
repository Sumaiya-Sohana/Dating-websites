import React from 'react';
import { motion } from 'motion/react';
import { Heart, Check, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface ActivitySelectorProps {
  selectedActivities: string[];
  onChangeActivities: (activities: string[]) => void;
  onNext: () => void;
}

const ACTIVITIES = [
  { id: 'Walk together', label: 'Walk together', emoji: '🚶', desc: 'Holding hands and taking slow steps' },
  { id: 'Take photos', label: 'Take photos', emoji: '📸', desc: 'Capturing cute selfies & smiles' },
  { id: 'Play games', label: 'Play games', emoji: '🎮', desc: 'Arcade fun or light board games' },
  { id: 'Watch a movie', label: 'Watch a movie', emoji: '🎬', desc: 'Sharing popcorn in dim theater' },
  { id: 'Listen to music', label: 'Listen to music', emoji: '🎵', desc: 'Sharing earphones with our favorites' },
  { id: 'Watch sunset', label: 'Watch sunset', emoji: '🌅', desc: 'Watching the golden twilight together' },
  { id: 'Talk for hours', label: 'Talk for hours', emoji: '💬', desc: 'Deep conversations about everything' },
  { id: 'Get dessert', label: 'Get dessert', emoji: '🍦', desc: 'Sweet treats to make it memorable' },
  { id: 'Explore somewhere new', label: 'Explore somewhere new', emoji: '🛍️', desc: 'Little wandering adventure' },
];

export const ActivitySelector: React.FC<ActivitySelectorProps> = ({
  selectedActivities,
  onChangeActivities,
  onNext,
}) => {
  const toggleActivity = (id: string) => {
    romanticAudio.playChime('medium');
    if (selectedActivities.includes(id)) {
      onChangeActivities(selectedActivities.filter((a) => a !== id));
    } else {
      onChangeActivities([...selectedActivities, id]);
    }
  };

  const canProceed = selectedActivities.length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Together Moments
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-bold mb-2">
            What should we do together? 🥰
          </h2>
          <p className="text-slate-600 font-sans text-sm">
            Select all the fun & sweet moments you'd love to share
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
          {ACTIVITIES.map((act) => {
            const isSelected = selectedActivities.includes(act.id);

            return (
              <motion.button
                key={act.id}
                type="button"
                id={`activity-btn-${act.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => toggleActivity(act.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50/95 border-rose-400 ring-2 ring-rose-300 shadow-md shadow-rose-200'
                    : 'bg-white/90 border-slate-200/90 hover:border-rose-300 hover:bg-rose-50/30'
                }`}
              >
                <span className="text-3xl shrink-0 mt-0.5">{act.emoji}</span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className="font-semibold text-rose-950 text-sm sm:text-base leading-tight">
                      {act.label}
                    </h4>

                    {/* Animated Checkbox */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? 'bg-rose-500 border-rose-500 text-white scale-110'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">
                    {act.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            id="activity-next-btn"
            disabled={!canProceed}
            onClick={onNext}
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base shadow-lg transition-all duration-200 ${
              canProceed
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300 hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Food & Drinks Time!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
