import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoaded, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 140);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-100/90 via-pink-50/95 to-rose-100/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center max-w-sm text-center"
      >
        {/* Heart Pulse Icon */}
        <div className="relative mb-8">
          {/* Glowing pulse rings */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 rounded-full bg-rose-400/30 blur-md"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center shadow-xl shadow-rose-300 text-white"
          >
            <Heart className="w-10 h-10 fill-white drop-shadow-sm" />
          </motion.div>

          {/* Little floating sparkles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-6 pointer-events-none"
          >
            <Sparkles className="w-5 h-5 text-rose-400 absolute top-0 right-1 fill-rose-200" />
            <Sparkles className="w-4 h-4 text-pink-400 absolute bottom-1 left-2 fill-pink-200" />
          </motion.div>
        </div>

        {/* Text */}
        <h2 className="font-serif text-2xl sm:text-3xl text-rose-950 font-semibold mb-2">
          Preparing something special for you... ❤️
        </h2>
        <p className="text-rose-700/80 font-sans text-sm mb-6">
          Gathering romantic moments & sweet thoughts
        </p>

        {/* Loading Progress Bar */}
        <div className="w-64 h-2 bg-white/80 rounded-full overflow-hidden p-0.5 border border-rose-200 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <span className="text-xs text-rose-500 font-medium mt-2">
          {progress}%
        </span>
      </motion.div>
    </div>
  );
};
