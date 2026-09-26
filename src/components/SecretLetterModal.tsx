import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X } from 'lucide-react';

interface SecretLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'easter_egg' | 'secret_letter';
}

export const SecretLetterModal: React.FC<SecretLetterModalProps> = ({
  isOpen,
  onClose,
  type = 'secret_letter',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-gradient-to-br from-rose-50 via-white to-pink-50 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200/80 text-center overflow-hidden"
          >
            {/* Wax seal effect */}
            <div className="mx-auto w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-400/50 mb-4 animate-pulse-glow">
              <Heart className="w-7 h-7 fill-white" />
            </div>

            <button
              onClick={onClose}
              id="close-secret-letter-btn"
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-rose-100/60 transition-colors"
              aria-label="Close message"
            >
              <X className="w-5 h-5" />
            </button>

            {type === 'easter_egg' ? (
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold tracking-wide uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Secret Easter Egg Unlocked
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-rose-950 mb-3 font-semibold">
                  You Found My Secret Message!
                </h3>
                <p className="text-rose-900/80 leading-relaxed font-sans text-base mb-6">
                  "If you're reading this, it means you're just as curious and special as I always knew you were. Every second spent planning this date was filled with smiles thinking about you. You make my world infinitely brighter. ❤️"
                </p>
              </div>
            ) : (
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold tracking-wide uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> A Hidden Love Letter
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-rose-950 mb-3 font-semibold">
                  Just Between Us Two...
                </h3>
                <p className="text-rose-900/80 leading-relaxed font-sans text-base mb-6">
                  "No matter where we go, or what we eat, or how long we stay out... what matters most to me is the person sitting across from me. I can't wait for our laughter, our shared glances, and every little memory we make. 🌹"
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-rose-100 flex justify-center">
              <button
                onClick={onClose}
                id="close-letter-accept-btn"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-sm shadow-md hover:shadow-rose-400/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Keep in My Heart ❤️
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
