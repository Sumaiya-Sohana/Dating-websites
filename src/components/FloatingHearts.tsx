import React, { useMemo } from 'react';

export const FloatingHearts: React.FC = () => {
  // Generate stable random items
  const hearts = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      size: 12 + (i % 5) * 6,
      left: `${(i * 6.2 + 4) % 94}%`,
      delay: `${(i * 0.7) % 5}s`,
      duration: `${10 + (i % 6) * 2.5}s`,
      opacity: 0.15 + (i % 4) * 0.08,
      color: i % 3 === 0 ? '#ff4d6d' : i % 3 === 1 ? '#ff758f' : '#e0aaff',
    }));
  }, []);

  const sparkles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      top: `${(i * 8.5 + 5) % 92}%`,
      left: `${(i * 11.3 + 3) % 95}%`,
      size: 3 + (i % 4) * 2,
      delay: `${(i * 0.4) % 3}s`,
      duration: `${3 + (i % 3)}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Subtle glowing orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 w-[30rem] h-[30rem] rounded-full bg-rose-100/40 blur-3xl" />

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: heart.left,
            bottom: '-40px',
            animation: `floatUp ${heart.duration} linear infinite`,
            animationDelay: heart.delay,
            opacity: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            className="transform transition-transform hover:scale-125"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Twinkling sparkles / stars */}
      {sparkles.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-rose-300/60"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: '0 0 8px rgba(251, 113, 133, 0.6)',
            animation: `twinkle ${star.duration} ease-in-out infinite`,
            animationDelay: star.delay,
          }}
        />
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.25;
          }
          85% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-115vh) rotate(25deg) scale(1.1);
            opacity: 0;
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  );
};
