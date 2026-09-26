import React, { useState } from 'react';
import { Heart, Mail, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface HeaderEasterEggProps {
  onOpenEasterEgg: () => void;
  onOpenSecretLetter: () => void;
  onReset?: () => void;
  isConfirmed?: boolean;
}

export const HeaderEasterEgg: React.FC<HeaderEasterEggProps> = ({
  onOpenEasterEgg,
  onOpenSecretLetter,
  onReset,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [heartBounce, setHeartBounce] = useState(false);

  const handleHeartClick = () => {
    setHeartBounce(true);
    setTimeout(() => setHeartBounce(false), 300);

    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 5) {
      setClickCount(0);
      onOpenEasterEgg();
    } else {
      romanticAudio.playChime('high');
    }
  };

  return (
    <header className="relative z-20 w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      {/* Brand logo with easter egg click target */}
      <button
        id="romantic-logo-button"
        onClick={handleHeartClick}
        title="Tap my heart ❤️"
        className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-md border border-rose-200/70 shadow-xs transition-all duration-200 text-left cursor-pointer"
      >
        <span
          className={`relative flex items-center justify-center text-rose-500 transition-transform ${
            heartBounce ? 'scale-130' : 'group-hover:scale-110'
          }`}
        >
          <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
          {clickCount > 0 && clickCount < 5 && (
            <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-rose-500 text-white rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
              {clickCount}
            </span>
          )}
        </span>
        <div className="flex flex-col">
          <span className="font-serif font-bold text-sm tracking-wide text-rose-950">
            Our Date Story
          </span>
          <span className="text-[10px] text-rose-700/80 font-sans -mt-0.5">
            Made with love
          </span>
        </div>
      </button>

      {/* Header controls: Secret Letter, Music Toggle, Reset */}
      <div className="flex items-center gap-2">
        {/* Secret Love Letter Button */}
        <button
          id="secret-letter-nav-btn"
          onClick={onOpenSecretLetter}
          title="Secret love note for you"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100/70 hover:bg-rose-200/80 text-rose-800 border border-rose-200 text-xs font-medium backdrop-blur-xs transition-all duration-200 hover:scale-105 shadow-xs"
        >
          <Mail className="w-3.5 h-3.5 text-rose-600 fill-rose-100" />
          <span className="hidden sm:inline">Secret Note</span>
          <span className="inline sm:hidden">💌</span>
        </button>

        {onReset && (
          <button
            id="reset-experience-btn"
            onClick={onReset}
            title="Start Over"
            className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-100/60 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
