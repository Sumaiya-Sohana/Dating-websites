import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Palette, ArrowRight, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface DressCodeSelectorProps {
  dressCode: string;
  matchingColor: string;
  onSelectDressCode: (code: string) => void;
  onSelectMatchingColor: (color: string) => void;
  onNext: () => void;
}

const DRESS_OPTIONS = [
  { id: 'Casual & Cute', label: 'Casual & Cute', emoji: '🌸', desc: 'Comfy, adorable & relaxed' },
  { id: 'Elegant', label: 'Elegant', emoji: '🤍', desc: 'Chic, polished & charming' },
  { id: 'Black Outfit', label: 'Black Outfit', emoji: '🖤', desc: 'Midnight luxury & sleek aesthetic' },
  { id: 'Romantic', label: 'Romantic', emoji: '🌹', desc: 'Pastels, florals & romantic flair' },
  { id: 'Whatever feels comfortable', label: 'Whatever feels comfortable', emoji: '👕', desc: 'Just be you!' },
];

const COLOR_PAIRS = [
  { id: 'Red & Black', label: 'Red & Black', icon: '❤️🖤' },
  { id: 'White & Black', label: 'White & Black', icon: '🤍🖤' },
  { id: 'Pink & White', label: 'Pink & White', icon: '🌸🤍' },
  { id: 'Blue & White', label: 'Blue & White', icon: '💙🤍' },
  { id: 'No preference', label: 'No preference', icon: '✨' },
];

export const DressCodeSelector: React.FC<DressCodeSelectorProps> = ({
  dressCode,
  matchingColor,
  onSelectDressCode,
  onSelectMatchingColor,
  onNext,
}) => {
  const handleDress = (id: string) => {
    romanticAudio.playChime('medium');
    onSelectDressCode(id);
  };

  const handleColor = (id: string) => {
    romanticAudio.playChime('high');
    onSelectMatchingColor(id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" /> Style Coordination
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-bold mb-2">
            What should we wear? 👗✨
          </h2>
          <p className="text-slate-600 font-sans text-sm">
            Choose our date attire vibe
          </p>
        </div>

        {/* Dress Style Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
          {DRESS_OPTIONS.map((opt) => {
            const isSelected = dressCode === opt.id;

            return (
              <motion.button
                key={opt.id}
                type="button"
                id={`dress-btn-${opt.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => handleDress(opt.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50/90 border-rose-400 ring-2 ring-rose-300 shadow-md shadow-rose-200'
                    : 'bg-white/90 border-slate-200/90 hover:border-rose-300 hover:bg-rose-50/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{opt.emoji}</span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-rose-500 border-rose-500 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <h4 className="font-semibold text-rose-950 text-sm sm:text-base mb-1">
                  {opt.label}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {opt.desc}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Matching Colors Section */}
        <div className="border-t border-rose-100 pt-6 mb-8">
          <div className="text-center mb-4">
            <h3 className="font-serif text-xl sm:text-2xl text-rose-950 font-semibold mb-1 flex items-center justify-center gap-2">
              <Palette className="w-5 h-5 text-rose-500" />
              Matching colors?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Should our outfits coordinate?
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {COLOR_PAIRS.map((col) => {
              const isSelected = matchingColor === col.id;

              return (
                <button
                  key={col.id}
                  type="button"
                  id={`color-btn-${col.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => handleColor(col.id)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-300 shadow-md scale-105'
                      : 'bg-white/90 border-slate-200 hover:border-rose-300'
                  }`}
                >
                  <span className="text-xl mb-1">{col.icon}</span>
                  <span
                    className={`text-xs font-semibold text-center ${
                      isSelected ? 'text-rose-900' : 'text-slate-700'
                    }`}
                  >
                    {col.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            id="dress-next-btn"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base shadow-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Pick Activities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
