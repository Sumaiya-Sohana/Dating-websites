import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, MailOpen, ArrowRight } from 'lucide-react';
import { triggerLoveBurst } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';

interface SurpriseScreenProps {
  onProceed: () => void;
}

export const SurpriseScreen: React.FC<SurpriseScreenProps> = ({ onProceed }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    triggerLoveBurst();
    romanticAudio.playChime('happy');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center text-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="sealed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white/75 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-rose-100 shadow-xl shadow-rose-200/40"
          >
            {/* Romantic Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 font-medium text-xs tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              A Special Journey Just For Us
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-5xl text-rose-950 font-bold mb-4 tracking-tight">
              I Have A Little Surprise For You...
            </h1>

            {/* Subtitle */}
            <p className="text-rose-900/80 font-sans text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8">
              "This isn't just a website... it's a little journey for us. ❤️"
            </p>

            {/* Animated Envelope Graphic */}
            <div className="relative mx-auto w-32 h-24 mb-8">
              <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-300 shadow-lg shadow-rose-300/50 flex items-center justify-center transform transition-transform hover:scale-105 duration-300">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md animate-pulse">
                  <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
                </div>
              </div>
            </div>

            {/* Open Button */}
            <button
              id="open-surprise-btn"
              onClick={handleOpenEnvelope}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-size-200 hover:bg-right text-white font-semibold text-lg shadow-xl shadow-rose-400/40 hover:shadow-rose-500/50 hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-white/80" />
              <span>✨ Open My Surprise</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-white/85 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-rose-200/80 shadow-2xl shadow-rose-200/50 relative overflow-hidden"
          >
            {/* Top decorative badge */}
            <div className="w-16 h-16 rounded-full bg-rose-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-rose-300 mb-6 animate-pulse-glow">
              <MailOpen className="w-8 h-8" />
            </div>

            <h2 className="font-romantic text-4xl sm:text-5xl text-rose-600 mb-4">
              Dearest You...
            </h2>

            {/* Romantic message */}
            <blockquote className="font-serif text-xl sm:text-2xl text-rose-950 font-medium leading-relaxed max-w-lg mx-auto mb-8 px-4 py-2 border-y border-rose-100">
              "Someone has been planning something special... and that someone wants to spend a beautiful day with you. ❤️"
            </blockquote>

            <div className="space-y-4 max-w-md mx-auto">
              <p className="font-sans text-base text-rose-900/85 font-medium">
                But first... I need to ask you something.
              </p>

              <button
                id="begin-questions-btn"
                onClick={onProceed}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-lg shadow-xl shadow-rose-400/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Let's Begin 💕</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
