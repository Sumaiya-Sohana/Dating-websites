import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Utensils, Trees, Coffee, Film, ArrowRight, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface PlaceSelectorProps {
  selectedPlace: string;
  onSelectPlace: (place: string) => void;
  onNext: () => void;
}

const PLACES = [
  {
    id: 'Restaurant',
    title: 'Restaurant',
    icon: Utensils,
    emoji: '🍽️',
    description: 'Good food, good conversations, good company.',
    highlight: 'Candlelight & gourmet dinner',
  },
  {
    id: 'Park',
    title: 'Park',
    icon: Trees,
    emoji: '🌳',
    description: 'Fresh air, peaceful walks and endless conversations.',
    highlight: 'Nature walks & soft breeze',
  },
  {
    id: 'Rooftop / Café',
    title: 'Rooftop / Café',
    icon: Coffee,
    emoji: '🌅',
    description: 'City lights and a little romance.',
    highlight: 'Warm coffee & skyline views',
  },
  {
    id: 'Movie / Entertainment',
    title: 'Movie / Entertainment',
    icon: Film,
    emoji: '🎬',
    description: 'For a fun and relaxed date.',
    highlight: 'Popcorn & shared laughs',
  },
];

export const PlaceSelector: React.FC<PlaceSelectorProps> = ({
  selectedPlace,
  onSelectPlace,
  onNext,
}) => {
  const handleSelect = (place: string) => {
    romanticAudio.playChime('medium');
    onSelectPlace(place);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-rose-500" /> Romantic Destination
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-bold mb-2">
            Where should we create our memory? 🌍❤️
          </h2>
          <p className="text-slate-600 font-sans text-sm">
            Pick our special rendezvous location
          </p>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {PLACES.map((p) => {
            const isSelected = selectedPlace === p.id;
            const Icon = p.icon;

            return (
              <motion.button
                key={p.id}
                type="button"
                id={`place-btn-${p.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => handleSelect(p.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex flex-col text-left p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50/90 border-rose-500 ring-2 ring-rose-200 shadow-lg shadow-rose-200'
                    : 'bg-white/90 border-slate-200/90 hover:border-rose-300 hover:bg-rose-50/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{p.emoji}</span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-rose-500 border-rose-500 text-white shadow-xs'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-rose-950 mb-1">
                  {p.title}
                </h3>
                <p className="text-slate-600 font-sans text-sm leading-relaxed mb-3">
                  "{p.description}"
                </p>

                <div className="mt-auto">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                      isSelected
                        ? 'bg-rose-200 text-rose-900'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {p.highlight}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            id="place-next-btn"
            disabled={!selectedPlace}
            onClick={onNext}
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base shadow-lg transition-all duration-200 ${
              selectedPlace
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300 hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Decide Dress Code</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
