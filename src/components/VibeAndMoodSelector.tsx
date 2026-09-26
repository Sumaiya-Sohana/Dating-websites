import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface VibeAndMoodSelectorProps {
  selectedVibes: string[];
  selectedMood: string | null;
  onChangeVibes: (vibes: string[]) => void;
  onChangeMood: (mood: string) => void;
  onNext: () => void;
}

const VIBE_OPTIONS = [
  { id: 'Romantic', label: 'Romantic', icon: '🌹', desc: 'Candles, soft music & sweet whispers' },
  { id: 'Peaceful', label: 'Peaceful', icon: '🌳', desc: 'Quiet gardens, gentle breeze & smiles' },
  { id: 'Fun & Playful', label: 'Fun & Playful', icon: '😂', desc: 'Laughter, games & playful teasing' },
  { id: 'Foodie', label: 'Foodie', icon: '🍽️', desc: 'Delicious dishes & mouthwatering treats' },
  { id: 'Sunset', label: 'Sunset', icon: '🌅', desc: 'Golden skies & heartwarming views' },
  { id: 'Movie & Chill', label: 'Movie & Chill', icon: '🎬', desc: 'Cozy moments & good storytelling' },
];

const MOOD_OPTIONS = [
  { id: 'Happy', label: 'Happy', emoji: '😊' },
  { id: 'Romantic', label: 'Romantic', emoji: '🥰' },
  { id: 'Relaxed', label: 'Relaxed', emoji: '😌' },
  { id: 'Excited', label: 'Excited', emoji: '✨' },
  { id: 'Shy', label: 'Shy', emoji: '😳' },
];

export const VibeAndMoodSelector: React.FC<VibeAndMoodSelectorProps> = ({
  selectedVibes,
  selectedMood,
  onChangeVibes,
  onChangeMood,
  onNext,
}) => {
  const toggleVibe = (id: string) => {
    romanticAudio.playChime('medium');
    if (selectedVibes.includes(id)) {
      onChangeVibes(selectedVibes.filter((v) => v !== id));
    } else {
      onChangeVibes([...selectedVibes, id]);
    }
  };

  const handleMoodSelect = (id: string) => {
    romanticAudio.playChime('high');
    onChangeMood(id);
  };

  // Check if highly romantic combo
  const isSuperRomantic =
    selectedVibes.includes('Romantic') &&
    (selectedMood === 'Romantic' || selectedVibes.includes('Sunset'));

  const canProceed = selectedVibes.length > 0 && selectedMood !== null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" /> Compatibility Check
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-bold mb-2">
            Let's Find Our Perfect Date Vibe ✨
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base">
            What kind of date sounds perfect to you? (Select all you love)
          </p>
        </div>

        {/* Easter Egg banner if super romantic */}
        {isSuperRomantic && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 rounded-2xl bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 border border-rose-200 text-center text-rose-800 font-serif text-sm font-semibold shadow-xs"
          >
            "Okay... you're definitely in love. 😌❤️"
          </motion.div>
        )}

        {/* Vibe Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
          {VIBE_OPTIONS.map((vibe) => {
            const isSelected = selectedVibes.includes(vibe.id);
            return (
              <button
                key={vibe.id}
                type="button"
                id={`vibe-btn-${vibe.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => toggleVibe(vibe.id)}
                className={`relative flex flex-col text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50/90 border-rose-400 ring-2 ring-rose-300 shadow-md shadow-rose-200'
                    : 'bg-white/90 border-slate-200/80 hover:border-rose-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{vibe.icon}</span>
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
                <h4 className="font-semibold text-rose-950 text-base mb-1">
                  {vibe.label}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {vibe.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Mood Selection */}
        <div className="border-t border-rose-100 pt-6 mb-8">
          <div className="text-center mb-4">
            <h3 className="font-serif text-xl sm:text-2xl text-rose-950 font-semibold mb-1">
              What's your mood?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              How are you feeling about spending this day together?
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {MOOD_OPTIONS.map((m) => {
              const isSelected = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  id={`mood-btn-${m.id.toLowerCase()}`}
                  onClick={() => handleMoodSelect(m.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-rose-100 to-pink-50 border-rose-400 ring-2 ring-rose-300 shadow-md scale-105'
                      : 'bg-white/90 border-slate-200 hover:border-rose-300 hover:bg-rose-50/50'
                  }`}
                >
                  <span className="text-3xl mb-1.5 transform transition-transform group-hover:scale-110">
                    {m.emoji}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isSelected ? 'text-rose-800 font-bold' : 'text-slate-700'
                    }`}
                  >
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            id="vibe-next-btn"
            disabled={!canProceed}
            onClick={onNext}
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base shadow-lg transition-all duration-200 ${
              canProceed
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300 hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Lock In Our Vibe & Pick Date</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
