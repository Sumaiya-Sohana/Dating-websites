import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Send, Edit3, ArrowRight } from 'lucide-react';
import { triggerLoveBurst } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';

interface LoveNoteProps {
  note: string;
  isSealed: boolean;
  onChangeNote: (note: string) => void;
  onSetSealed: (sealed: boolean) => void;
  onNext: () => void;
}

export const LoveNote: React.FC<LoveNoteProps> = ({
  note,
  isSealed,
  onChangeNote,
  onSetSealed,
  onNext,
}) => {
  const [localSealed, setLocalSealed] = useState(isSealed);
  const maxChars = 500;

  const handleSeal = () => {
    if (!note.trim()) {
      return;
    }
    setLocalSealed(true);
    onSetSealed(true);
    triggerLoveBurst();
    romanticAudio.playChime('happy');
  };

  const handleUnseal = () => {
    setLocalSealed(false);
    onSetSealed(false);
    romanticAudio.playChime('medium');
  };

  const hasNote = note.trim().length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" /> Heartfelt Words
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-bold mb-2">
            Leave a little message for me... 💌
          </h2>
          <p className="text-slate-600 font-sans text-sm">
            Write your own personal words from the heart (optional)
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!localSealed || !hasNote ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4 mb-8"
            >
              <div className="relative">
                <textarea
                  id="love-note-textarea"
                  value={note}
                  maxLength={maxChars}
                  onChange={(e) => onChangeNote(e.target.value)}
                  placeholder="Write your personal message here..."
                  rows={6}
                  className="w-full p-5 rounded-3xl bg-rose-50/40 border border-rose-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 text-rose-950 placeholder:text-slate-400 font-serif text-base sm:text-lg leading-relaxed resize-none transition-all shadow-inner"
                />

                {/* Character Counter & Clear Action */}
                <div className="flex justify-between items-center px-2 text-xs text-slate-400 font-sans">
                  <span>
                    {hasNote ? (
                      <button
                        type="button"
                        onClick={() => {
                          onChangeNote('');
                          setLocalSealed(false);
                          onSetSealed(false);
                        }}
                        className="text-rose-600 hover:text-rose-800 underline cursor-pointer transition-colors"
                      >
                        Clear message ✕
                      </button>
                    ) : (
                      'A personal note just for our eyes'
                    )}
                  </span>
                  <span>
                    {note.length} / {maxChars} characters
                  </span>
                </div>
              </div>

              {/* Seal Button */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                <button
                  id="seal-envelope-btn"
                  type="button"
                  disabled={!hasNote}
                  onClick={handleSeal}
                  className={`px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all ${
                    hasNote
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-300 cursor-pointer hover:scale-105'
                      : 'bg-rose-200 text-rose-400 cursor-not-allowed opacity-75'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>{hasNote ? 'Seal Into Romantic Envelope 💌' : 'Write a message to seal 💌'}</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sealed-envelope"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative my-6 p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 border-2 border-rose-200 shadow-2xl text-center overflow-hidden"
            >
              {/* Wax Seal Stamp */}
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-lg shadow-rose-400/60 mb-4 animate-pulse-glow">
                <Heart className="w-8 h-8 fill-white" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
                Letter Sealed with Love
              </span>

              <p className="font-serif italic text-lg text-rose-950 max-w-md mx-auto leading-relaxed my-4 whitespace-pre-wrap">
                "{note}"
              </p>

              <button
                type="button"
                id="unseal-letter-btn"
                onClick={handleUnseal}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200 text-rose-700 text-xs font-medium hover:bg-white transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Open & Edit Note</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        <div className="flex justify-end pt-4 border-t border-rose-100">
          <button
            id="lovenote-next-btn"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base shadow-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Digital Date Invitation 🎟️</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
