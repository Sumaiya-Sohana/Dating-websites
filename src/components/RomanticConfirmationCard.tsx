import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from 'lucide-react';
import { DateState } from '../types';
import { formatWhatsAppMessage, generateWhatsAppUrl } from '../utils/whatsapp';
import { romanticAudio } from '../utils/audio';

interface RomanticConfirmationCardProps {
  state: DateState;
}

export const RomanticConfirmationCard: React.FC<RomanticConfirmationCardProps> = ({ state }) => {
  const [copied, setCopied] = useState(false);
  const [showFullNote, setShowFullNote] = useState(false);

  const message = formatWhatsAppMessage(state);

  const handleSendWhatsApp = () => {
    romanticAudio.playChime('high');
    const url = generateWhatsAppUrl('8801724837714', message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      romanticAudio.playChime('high');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-3xl bg-gradient-to-br from-white via-rose-50/40 to-emerald-50/40 border border-emerald-200/80 p-6 sm:p-8 shadow-xl shadow-emerald-950/5 text-center relative overflow-hidden"
    >
      {/* Decorative top romantic accent */}
      <div className="w-12 h-1 bg-gradient-to-r from-emerald-300 via-rose-300 to-emerald-300 rounded-full mx-auto mb-4" />

      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span>WhatsApp Confirmation</span>
      </div>

      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 mb-5">
        Send Confirmation to WhatsApp 💬
      </h3>

      {/* Primary WhatsApp Action */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          id="send-confirmation-whatsapp-btn"
          type="button"
          onClick={handleSendWhatsApp}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-100 transition-all cursor-pointer"
        >
          <Send className="w-5 h-5 fill-white" />
          <span>Send to WhatsApp 💬</span>
        </motion.button>

        <button
          id="copy-confirmation-btn"
          type="button"
          onClick={handleCopyMessage}
          className="w-full sm:w-auto px-5 py-4 rounded-full bg-white hover:bg-rose-50/70 border border-slate-200 text-slate-700 font-semibold text-sm flex items-center justify-center gap-1.5 shadow-xs hover:border-emerald-300 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span className="text-emerald-700 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copy Message</span>
            </>
          )}
        </button>
      </div>

      {/* Preview toggle */}
      <div className="pt-3 border-t border-slate-100">
        <button
          type="button"
          id="toggle-confirmation-preview-btn"
          onClick={() => setShowFullNote((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <span>{showFullNote ? 'Hide WhatsApp Message' : 'Preview WhatsApp Message'}</span>
          {showFullNote ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <AnimatePresence>
          {showFullNote && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden text-left"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-slate-200/80 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto shadow-inner">
                {message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

