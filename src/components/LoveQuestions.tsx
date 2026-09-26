import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ArrowRight, ArrowLeft, Stars, CheckCircle2 } from 'lucide-react';
import { triggerLoveBurst, triggerBigCelebration } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';

interface LoveQuestionsProps {
  onCompleteAll: () => void;
  savedLikedMe: 'yes' | 'maybe' | 'no' | null;
  savedLovesMe: 'yes' | 'of_course' | 'maybe' | 'no' | null;
  savedWantsDate: 'yes' | 'maybe' | 'no' | null;
  onUpdateAnswers: (answers: {
    likedMe: 'yes' | 'maybe' | 'no';
    lovesMe?: 'yes' | 'of_course' | 'maybe' | 'no';
    wantsDate?: 'yes' | 'maybe' | 'no';
  }) => void;
}

export const LoveQuestions: React.FC<LoveQuestionsProps> = ({
  onCompleteAll,
  savedLikedMe,
  savedLovesMe,
  savedWantsDate,
  onUpdateAnswers,
}) => {
  // Always start at question index 0 so questions are immediately visible
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isYayScreen, setIsYayScreen] = useState(false);
  const [maybeDodgeCount, setMaybeDodgeCount] = useState(0);

  // Q1 No states & dodging
  const [q1NoClickCount, setQ1NoClickCount] = useState(0);
  const [q1NoOffset, setQ1NoOffset] = useState({ x: 0, y: 0 });

  // Q2 No states & dodging
  const [q2NoClickCount, setQ2NoClickCount] = useState(0);
  const [q2NoOffset, setQ2NoOffset] = useState({ x: 0, y: 0 });

  // Q3 No states & dodging
  const [noClickCount, setNoClickCount] = useState(0);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [showNoConfirmModal, setShowNoConfirmModal] = useState(false);

  // Question 1 Dodge & Handlers
  const handleQ1NoDodge = () => {
    const nextCount = q1NoClickCount + 1;
    setQ1NoClickCount(nextCount);
    romanticAudio.playChime('medium');

    const phrases = [
      'Wait, really? 🥺 My heart!',
      'No way! Look at that pretty Yes button! 💕',
      'Catch me if you can! 🏃💨',
      'Error 404: Dislike not allowed! 🙈❤️',
      "Are you sure you don't like me a little bit? 👉👈",
      'Look how bright and big the Yes button is! 🥰',
    ];
    setFeedback(phrases[(nextCount - 1) % phrases.length]);

    const randomX = (Math.random() - 0.5) * 140;
    const randomY = (Math.random() - 0.5) * 60;
    setQ1NoOffset({ x: randomX, y: randomY });
  };

  const handleQ1NoClick = () => {
    handleQ1NoDodge();
    if (q1NoClickCount >= 2) {
      onUpdateAnswers({ likedMe: 'no' });
      setFeedback('Aww... 🥺 Even so, Question 2 might change your mind! 💕');
      setTimeout(() => {
        setFeedback(null);
        setCurrentQIndex(1);
      }, 1400);
    }
  };

  const handleQ1 = (choice: 'yes' | 'maybe' | 'no') => {
    if (choice === 'no') {
      handleQ1NoClick();
      return;
    }
    romanticAudio.playChime(choice === 'yes' ? 'happy' : 'medium');
    triggerLoveBurst();
    const msg =
      choice === 'yes'
        ? 'I knew there was something special between us... 🥰'
        : "Hmm... I'll have to win your heart then! 😌❤️";
    setFeedback(msg);
    onUpdateAnswers({ likedMe: choice });

    setTimeout(() => {
      setFeedback(null);
      setCurrentQIndex(1);
    }, 1200);
  };

  // Question 2 Dodge & Handlers
  const handleQ2NoDodge = () => {
    const nextCount = q2NoClickCount + 1;
    setQ2NoClickCount(nextCount);
    romanticAudio.playChime('medium');

    const phrases = [
      'Ouch! 💔 That hurts my feelings!',
      'Hey! You are supposed to love me! 🥺💖',
      'Nice try, but "No" keeps running away! 🏃‍♀️💨',
      'Look how bright "Of course!" is glowing! 🥰',
      'My heart says you definitely love me! 💕',
      'Nope! Try pressing the pink button! 🙈',
    ];
    setFeedback(phrases[(nextCount - 1) % phrases.length]);

    const randomX = (Math.random() - 0.5) * 140;
    const randomY = (Math.random() - 0.5) * 60;
    setQ2NoOffset({ x: randomX, y: randomY });
  };

  const handleQ2NoClick = () => {
    handleQ2NoDodge();
    if (q2NoClickCount >= 2) {
      onUpdateAnswers({ likedMe: savedLikedMe || 'yes', lovesMe: 'no' });
      setFeedback('Ouch! 💔 But you still have to answer the date question next! 🌹');
      setTimeout(() => {
        setFeedback(null);
        setCurrentQIndex(2);
      }, 1400);
    }
  };

  const handleQ2 = (choice: 'yes' | 'of_course' | 'maybe' | 'no') => {
    if (choice === 'no') {
      handleQ2NoClick();
      return;
    }
    romanticAudio.playChime(choice !== 'maybe' ? 'high' : 'medium');
    triggerLoveBurst();
    const msg =
      choice === 'of_course'
        ? 'My heart just skipped a beat! 🥰💖'
        : choice === 'yes'
        ? 'You make me the happiest person ever! ❤️'
        : "I'll make you fall even deeper in love, just watch! 😌✨";
    setFeedback(msg);
    onUpdateAnswers({ likedMe: savedLikedMe || 'yes', lovesMe: choice });

    setTimeout(() => {
      setFeedback(null);
      setCurrentQIndex(2);
    }, 1200);
  };

  // Question 3 Handler
  const handleNoInteraction = () => {
    const nextCount = noClickCount + 1;
    setNoClickCount(nextCount);
    romanticAudio.playChime('medium');

    const phrases = [
      'Wait, really? 🥺 Are you sure?',
      'Think about all the delicious food & fun! 🍕✨',
      'Pleaseee? Just one little date! 🥺👉👈',
      "You can't break my heart like this! 💔🥺",
      'Error 404: "No" is temporarily disabled! 🙈💖',
      'Look how big that glowing "Yes" button is getting! 🥰',
    ];
    setFeedback(phrases[(nextCount - 1) % phrases.length]);

    // Playful dodge offset
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 50;
    setNoOffset({ x: randomX, y: randomY });

    if (nextCount >= 5) {
      setShowNoConfirmModal(true);
    }
  };

  const handleConfirmNo = () => {
    onUpdateAnswers({
      likedMe: savedLikedMe || 'yes',
      lovesMe: savedLovesMe || 'maybe',
      wantsDate: 'no',
    });
    setShowNoConfirmModal(false);
    setFeedback('Aww... 🥺 Even so, you have a special place in my heart! (You can click Yes anytime ❤️)');
  };

  const handleQ3 = (choice: 'yes' | 'maybe' | 'no') => {
    if (choice === 'no') {
      handleNoInteraction();
      return;
    }

    if (choice === 'maybe') {
      setMaybeDodgeCount((prev) => prev + 1);
      romanticAudio.playChime('medium');
      setFeedback('Are you sure? Try that other glowing button... 🥺❤️');
      return;
    }

    // YES!
    romanticAudio.playChime('high');
    triggerBigCelebration();
    onUpdateAnswers({
      likedMe: savedLikedMe || 'yes',
      lovesMe: savedLovesMe || 'of_course',
      wantsDate: 'yes',
    });
    setIsYayScreen(true);
  };

  // Celebration Screen when she says YES
  if (isYayScreen) {
    return (
      <div className="relative w-full max-w-2xl mx-auto px-4 py-6 text-center">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 via-pink-400/30 to-amber-300/20 rounded-3xl blur-2xl -z-10 animate-pulse-glow" />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 260 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-rose-300 shadow-2xl shadow-rose-400/40"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white mx-auto flex items-center justify-center shadow-xl shadow-rose-300 mb-6 animate-bounce">
            <Heart className="w-12 h-12 fill-white" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-rose-500" />
            Celebration Unlocked!
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-rose-600 font-extrabold tracking-tight mb-4 animate-pulse">
            YAAAAAY! IT'S A DATE! 💕
          </h1>

          <p className="font-serif text-lg sm:text-2xl text-rose-950 font-medium max-w-md mx-auto leading-relaxed mb-8">
            "You just made this ordinary day feel like pure magic. Now let's design our perfect date together!"
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="proceed-to-vibe-btn"
              onClick={onCompleteAll}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white font-bold text-lg shadow-xl shadow-rose-400/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>Plan Our Dream Date ✨</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              id="review-questions-btn"
              onClick={() => {
                setIsYayScreen(false);
                setCurrentQIndex(0);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 text-sm font-semibold transition-colors cursor-pointer"
            >
              Review Questions 💌
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const questionsList = [
    { num: 1, title: 'Do you like me? 🥺', answered: !!savedLikedMe },
    { num: 2, title: 'Do you love me? 💖', answered: !!savedLovesMe },
    { num: 3, title: 'Go on a date? 🌹', answered: !!savedWantsDate },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6">
      {/* Interactive Question Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {questionsList.map((q, idx) => {
          const isActive = currentQIndex === idx;
          return (
            <button
              key={q.num}
              type="button"
              id={`question-tab-${q.num}`}
              onClick={() => {
                setFeedback(null);
                setCurrentQIndex(idx);
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-300 scale-105'
                  : q.answered
                  ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                  : 'bg-white/80 text-slate-600 hover:bg-rose-50 border border-rose-100'
              }`}
            >
              {q.answered ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Heart className={`w-3.5 h-3.5 ${isActive ? 'fill-white text-white' : 'text-rose-400'}`} />
              )}
              <span>Question {q.num}</span>
            </button>
          );
        })}

        {savedWantsDate === 'yes' && (
          <button
            type="button"
            id="view-celebration-tab-btn"
            onClick={() => setIsYayScreen(true)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100 to-rose-100 text-rose-900 border border-rose-200 hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Yay Screen</span>
          </button>
        )}
      </div>

      {/* Questions Carousel */}
      <AnimatePresence mode="wait">
        {currentQIndex === 0 && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 block">🥺</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-rose-950 font-bold mb-2">
              Do you like me? 🥺❤️
            </h2>
            <p className="text-rose-700/80 text-sm font-sans mb-8">
              Be honest, my heart is listening...
            </p>

            {feedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 font-medium text-base sm:text-lg mb-6"
              >
                {feedback}
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 relative min-h-[72px]">
              <motion.button
                id="q1-yes-btn"
                type="button"
                onClick={() => handleQ1('yes')}
                animate={{
                  scale: 1 + Math.min(q1NoClickCount * 0.06, 0.25),
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className={`px-4 py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  savedLikedMe === 'yes'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-300 ring-4 ring-rose-200'
                    : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:shadow-rose-300 hover:scale-104 active:scale-98'
                }`}
              >
                <span>💕 Yes, I do</span>
                {savedLikedMe === 'yes' && <CheckCircle2 className="w-5 h-5 text-white" />}
              </motion.button>

              <button
                id="q1-maybe-btn"
                type="button"
                onClick={() => handleQ1('maybe')}
                className={`px-4 py-4 rounded-2xl border font-semibold text-base sm:text-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                  savedLikedMe === 'maybe'
                    ? 'bg-rose-100 border-rose-400 text-rose-950 ring-4 ring-rose-200'
                    : 'bg-white/90 border-rose-200 text-rose-900 hover:border-rose-400 shadow-xs hover:scale-104 active:scale-98'
                }`}
              >
                <span>😳 Maybe</span>
                {savedLikedMe === 'maybe' && <CheckCircle2 className="w-5 h-5 text-rose-600" />}
              </button>

              <motion.button
                id="q1-no-btn"
                type="button"
                onMouseEnter={handleQ1NoDodge}
                onTouchStart={handleQ1NoDodge}
                onClick={handleQ1NoClick}
                animate={{
                  x: q1NoOffset.x,
                  y: q1NoOffset.y,
                  rotate: q1NoClickCount === 0 ? 0 : q1NoClickCount % 2 === 0 ? -8 : 8,
                  scale: Math.max(0.72, 1 - q1NoClickCount * 0.04),
                }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                className={`px-4 py-4 rounded-2xl border font-semibold text-base sm:text-lg transition-colors cursor-pointer flex items-center justify-center gap-2 select-none ${
                  savedLikedMe === 'no'
                    ? 'bg-rose-100 border-rose-400 text-rose-950 ring-4 ring-rose-200'
                    : 'bg-white/95 hover:bg-rose-50 border-rose-300 text-rose-800 shadow-xs hover:border-rose-400'
                }`}
              >
                <span>💔 No</span>
                {savedLikedMe === 'no' && <CheckCircle2 className="w-5 h-5 text-rose-600" />}
              </motion.button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                id="q1-next-question-btn"
                onClick={() => {
                  setFeedback(null);
                  setCurrentQIndex(1);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900 cursor-pointer px-3 py-1.5 rounded-full hover:bg-rose-50 transition-colors"
              >
                <span>Question 2</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {currentQIndex === 1 && (
          <motion.div
            key="q2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 block animate-bounce">💖</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-rose-950 font-bold mb-2">
              Do you love me? 💖
            </h2>
            <p className="text-rose-700/80 text-sm font-sans mb-8">
              Every beat of my heart hopes you do...
            </p>

            {feedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 font-medium text-base sm:text-lg mb-6"
              >
                {feedback}
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 relative min-h-[72px]">
              <button
                id="q2-yes-btn"
                type="button"
                onClick={() => handleQ2('yes')}
                className={`px-4 py-3.5 rounded-2xl font-semibold text-base transition-all duration-200 cursor-pointer ${
                  savedLovesMe === 'yes'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg ring-4 ring-rose-200'
                    : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:scale-105 active:scale-95'
                }`}
              >
                ❤️ Yes
              </button>

              <motion.button
                id="q2-ofcourse-btn"
                type="button"
                onClick={() => handleQ2('of_course')}
                animate={{
                  scale: 1 + Math.min(q2NoClickCount * 0.06, 0.25),
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className={`px-4 py-3.5 rounded-2xl font-bold text-base transition-transform cursor-pointer ${
                  savedLovesMe === 'of_course'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg ring-4 ring-rose-300'
                    : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md hover:scale-105 active:scale-95'
                }`}
              >
                🥰 Of course!
              </motion.button>

              <button
                id="q2-maybe-btn"
                type="button"
                onClick={() => handleQ2('maybe')}
                className={`px-4 py-3.5 rounded-2xl border font-semibold text-base transition-all duration-200 cursor-pointer ${
                  savedLovesMe === 'maybe'
                    ? 'bg-rose-100 border-rose-400 text-rose-950 ring-4 ring-rose-200'
                    : 'bg-white/90 border-rose-200 text-rose-900 hover:border-rose-400 shadow-xs hover:scale-105 active:scale-95'
                }`}
              >
                🙈 Maybe...
              </button>

              <motion.button
                id="q2-no-btn"
                type="button"
                onMouseEnter={handleQ2NoDodge}
                onTouchStart={handleQ2NoDodge}
                onClick={handleQ2NoClick}
                animate={{
                  x: q2NoOffset.x,
                  y: q2NoOffset.y,
                  rotate: q2NoClickCount === 0 ? 0 : q2NoClickCount % 2 === 0 ? -8 : 8,
                  scale: Math.max(0.72, 1 - q2NoClickCount * 0.04),
                }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                className={`px-4 py-3.5 rounded-2xl border font-semibold text-base transition-colors cursor-pointer flex items-center justify-center gap-1.5 select-none ${
                  savedLovesMe === 'no'
                    ? 'bg-rose-100 border-rose-400 text-rose-950 ring-4 ring-rose-200'
                    : 'bg-white/95 hover:bg-rose-50 border-rose-300 text-rose-800 shadow-xs hover:border-rose-400'
                }`}
              >
                <span>💔 No</span>
              </motion.button>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                id="q2-prev-question-btn"
                onClick={() => {
                  setFeedback(null);
                  setCurrentQIndex(0);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-700 cursor-pointer px-3 py-1.5 rounded-full hover:bg-rose-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Question 1</span>
              </button>

              <button
                type="button"
                id="q2-next-question-btn"
                onClick={() => {
                  setFeedback(null);
                  setCurrentQIndex(2);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900 cursor-pointer px-3 py-1.5 rounded-full hover:bg-rose-50 transition-colors"
              >
                <span>Question 3</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {currentQIndex === 2 && (
          <motion.div
            key="q3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-200 shadow-2xl shadow-rose-300/50 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center mb-4">
              <Stars className="w-8 h-8 text-rose-600" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-rose-950 font-bold mb-3">
              Will you go on a date with me? 🌹
            </h2>
            <p className="text-rose-700/80 text-sm sm:text-base font-sans mb-8">
              Say yes and let's design an unforgettable day together ✨
            </p>

            {feedback && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-rose-600 font-medium text-sm"
              >
                {feedback}
              </motion.p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 min-h-[76px]">
              <motion.button
                id="q3-yes-btn"
                type="button"
                onClick={() => handleQ3('yes')}
                animate={{
                  scale: 1 + Math.min(noClickCount * 0.08, 0.45),
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-lg sm:text-xl shadow-xl shadow-rose-400/40 hover:scale-105 active:scale-95 transition-transform ring-4 ring-rose-200 cursor-pointer flex items-center justify-center gap-2 z-10"
              >
                <span>💖 Yes, Absolutely!</span>
              </motion.button>

              <motion.button
                id="q3-no-btn"
                type="button"
                onMouseEnter={handleNoInteraction}
                onTouchStart={handleNoInteraction}
                onClick={() => handleQ3('no')}
                animate={{
                  x: noOffset.x,
                  y: noOffset.y,
                  rotate: noClickCount === 0 ? 0 : noClickCount % 2 === 0 ? -8 : 8,
                  scale: Math.max(0.72, 1 - noClickCount * 0.05),
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/95 hover:bg-rose-50 border-2 border-rose-300 text-rose-800 text-base font-semibold shadow-xs hover:border-rose-400 transition-colors cursor-pointer select-none"
              >
                <span>💔 No</span>
              </motion.button>
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                id="q3-prev-question-btn"
                onClick={() => {
                  setFeedback(null);
                  setCurrentQIndex(1);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-700 cursor-pointer px-3 py-1.5 rounded-full hover:bg-rose-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Question 2</span>
              </button>
            </div>

            {/* Playful No Confirmation Modal */}
            <AnimatePresence>
              {showNoConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center border-2 border-rose-300 shadow-2xl"
                  >
                    <span className="text-4xl mb-2 block animate-bounce">🥺💔</span>
                    <h3 className="font-serif text-xl font-bold text-rose-950 mb-2">
                      Wait... are you really, really sure?
                    </h3>
                    <p className="text-xs text-slate-600 mb-6 leading-relaxed font-sans">
                      "No" is such a sad word when there's so much love and delicious food waiting for us!
                    </p>
                    <div className="flex flex-col gap-2.5">
                      <button
                        type="button"
                        id="no-modal-yes-btn"
                        onClick={() => {
                          setShowNoConfirmModal(false);
                          handleQ3('yes');
                        }}
                        className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md hover:scale-102 cursor-pointer"
                      >
                        Just teasing, YES! 🥰💖
                      </button>
                      <button
                        type="button"
                        id="no-modal-confirm-no-btn"
                        onClick={handleConfirmNo}
                        className="w-full py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                      >
                        Confirm No 🥺
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
