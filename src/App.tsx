import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { DateState, Step } from './types';
import {
  loadSavedState,
  saveDateState,
  loadSavedStep,
  saveSavedStep,
  clearAllSavedData,
  initialDateState,
} from './utils/storage';
import { FloatingHearts } from './components/FloatingHearts';
import { HeaderEasterEgg } from './components/HeaderEasterEgg';
import { RomanticProgressBar } from './components/RomanticProgressBar';
import { SecretLetterModal } from './components/SecretLetterModal';
import { LoadingScreen } from './components/LoadingScreen';
import { SurpriseScreen } from './components/SurpriseScreen';
import { LoveQuestions } from './components/LoveQuestions';
import { VibeAndMoodSelector } from './components/VibeAndMoodSelector';
import { CalendarPicker } from './components/CalendarPicker';
import { TimeSelector } from './components/TimeSelector';
import { PlaceSelector } from './components/PlaceSelector';
import { DressCodeSelector } from './components/DressCodeSelector';
import { ActivitySelector } from './components/ActivitySelector';
import { FoodSelector } from './components/FoodSelector';
import { LoveNote } from './components/LoveNote';
import { DateInvitation } from './components/DateInvitation';
import { DateReview } from './components/DateReview';
import { CelebrationScreen } from './components/CelebrationScreen';
import { triggerBigCelebration } from './utils/confetti';
import { romanticAudio } from './utils/audio';
import { generateWhatsAppUrl, formatWhatsAppMessage } from './utils/whatsapp';

export default function App() {
  const [state, setState] = useState<DateState>(loadSavedState);
  const [currentStep, setCurrentStep] = useState<Step>(() => {
    const saved = loadSavedStep();
    if (saved && saved !== 'loading') {
      return saved as Step;
    }
    return 'loading';
  });

  // Easter egg & modal states
  const [modalType, setModalType] = useState<'easter_egg' | 'secret_letter' | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    saveDateState(state);
  }, [state]);

  // Sync step to LocalStorage (don't save 'loading')
  useEffect(() => {
    if (currentStep !== 'loading') {
      saveSavedStep(currentStep);
    }
  }, [currentStep]);

  // Partial state updater helper
  const updateState = useCallback((updates: Partial<DateState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Step transition helper with sound
  const goToStep = useCallback((step: Step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle checklist toggle
  const handleToggleChecklist = (key: string) => {
    setState((prev) => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [key]: !prev.checklist[key],
      },
    }));
  };

  // Handle custom checklist addition
  const handleAddCustomChecklist = (item: string) => {
    setState((prev) => ({
      ...prev,
      customChecklist: [...prev.customChecklist, item],
      checklist: {
        ...prev.checklist,
        [item]: false,
      },
    }));
  };

  // Reset all
  const handleStartOver = () => {
    if (window.confirm('Would you like to restart our romantic date planning journey? ❤️')) {
      clearAllSavedData();
      setState(initialDateState);
      setCurrentStep('surprise');
      romanticAudio.playChime('medium');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50/70 via-white to-pink-50/60 font-sans text-slate-800 flex flex-col justify-between overflow-x-hidden">
      {/* Background Animated Floating Hearts & Sparkles */}
      <FloatingHearts />

      {/* Secret Letter Modal */}
      <SecretLetterModal
        isOpen={modalType !== null}
        type={modalType || 'secret_letter'}
        onClose={() => setModalType(null)}
      />

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Top Header with Logo, Music, and Easter Egg */}
        {currentStep !== 'loading' && (
          <HeaderEasterEgg
            onOpenEasterEgg={() => setModalType('easter_egg')}
            onOpenSecretLetter={() => setModalType('secret_letter')}
            onReset={currentStep === 'confirmation' ? handleStartOver : undefined}
          />
        )}

        {/* Progress Bar (Visible after loading, surprise, and questions) */}
        {currentStep !== 'loading' && currentStep !== 'surprise' && (
          <RomanticProgressBar
            currentStep={currentStep}
            canNavigate={true}
            onNavigateStep={goToStep}
          />
        )}

        {/* Step Views with smooth transitions */}
        <main className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {currentStep === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingScreen onLoaded={() => goToStep('surprise')} />
              </motion.div>
            )}

            {currentStep === 'surprise' && (
              <motion.div
                key="surprise"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <SurpriseScreen onProceed={() => goToStep('questions')} />
              </motion.div>
            )}

            {currentStep === 'questions' && (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <LoveQuestions
                  savedLikedMe={state.likedMe}
                  savedLovesMe={state.lovesMe}
                  savedWantsDate={state.wantsDate}
                  onUpdateAnswers={(ans) => updateState(ans)}
                  onCompleteAll={() => goToStep('vibe_mood')}
                />
              </motion.div>
            )}

            {currentStep === 'vibe_mood' && (
              <motion.div
                key="vibe_mood"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <VibeAndMoodSelector
                  selectedVibes={state.dateVibes}
                  selectedMood={state.mood}
                  onChangeVibes={(vibes) => updateState({ dateVibes: vibes })}
                  onChangeMood={(mood) => updateState({ mood })}
                  onNext={() => goToStep('date')}
                />
              </motion.div>
            )}

            {currentStep === 'date' && (
              <motion.div
                key="date"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <CalendarPicker
                  selectedDate={state.selectedDate}
                  onSelectDate={(date) => updateState({ selectedDate: date })}
                  onNext={() => goToStep('time')}
                />
              </motion.div>
            )}

            {currentStep === 'time' && (
              <motion.div
                key="time"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <TimeSelector
                  selectedTime={state.selectedTime}
                  onSelectTime={(time) => updateState({ selectedTime: time })}
                  onNext={() => goToStep('place')}
                />
              </motion.div>
            )}

            {currentStep === 'place' && (
              <motion.div
                key="place"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <PlaceSelector
                  selectedPlace={state.selectedPlace}
                  onSelectPlace={(place) => updateState({ selectedPlace: place })}
                  onNext={() => goToStep('dress_code')}
                />
              </motion.div>
            )}

            {currentStep === 'dress_code' && (
              <motion.div
                key="dress_code"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <DressCodeSelector
                  dressCode={state.dressCode}
                  matchingColor={state.matchingColor}
                  onSelectDressCode={(code) => updateState({ dressCode: code })}
                  onSelectMatchingColor={(color) => updateState({ matchingColor: color })}
                  onNext={() => goToStep('activities')}
                />
              </motion.div>
            )}

            {currentStep === 'activities' && (
              <motion.div
                key="activities"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <ActivitySelector
                  selectedActivities={state.activities}
                  onChangeActivities={(activities) => updateState({ activities })}
                  onNext={() => goToStep('food')}
                />
              </motion.div>
            )}

            {currentStep === 'food' && (
              <motion.div
                key="food"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <FoodSelector
                  foods={state.foods}
                  desserts={state.desserts}
                  drinks={state.drinks}
                  customFood={state.customFood}
                  onChangeFoods={(foods) => updateState({ foods })}
                  onChangeDesserts={(desserts) => updateState({ desserts })}
                  onChangeDrinks={(drinks) => updateState({ drinks })}
                  onChangeCustomFood={(customFood) => updateState({ customFood })}
                  onNext={() => goToStep('love_note')}
                />
              </motion.div>
            )}

            {currentStep === 'love_note' && (
              <motion.div
                key="love_note"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <LoveNote
                  note={state.loveNote}
                  isSealed={state.loveNoteSealed}
                  onChangeNote={(note) => updateState({ loveNote: note })}
                  onSetSealed={(sealed) => updateState({ loveNoteSealed: sealed })}
                  onNext={() => goToStep('invitation')}
                />
              </motion.div>
            )}

            {currentStep === 'invitation' && (
              <motion.div
                key="invitation"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <DateInvitation
                  state={state}
                  onProceedToReview={() => goToStep('review')}
                />
              </motion.div>
            )}

            {currentStep === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <DateReview
                  state={state}
                  onEditSection={(targetStep) => goToStep(targetStep)}
                  onConfirmDate={() => {
                    const confirmedAt = new Date().toISOString();
                    const nextState: DateState = {
                      ...state,
                      confirmed: true,
                      confirmedAt,
                    };
                    updateState({
                      confirmed: true,
                      confirmedAt,
                    });
                    // Automatically route details to WhatsApp (01724837714)
                    const waUrl = generateWhatsAppUrl('8801724837714', formatWhatsAppMessage(nextState));
                    window.open(waUrl, '_blank', 'noopener,noreferrer');
                    goToStep('confirmation');
                  }}
                  onUpdateWhatsAppNumber={(phone) => updateState({ whatsappNumber: phone })}
                />
              </motion.div>
            )}

            {currentStep === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <CelebrationScreen
                  state={state}
                  onToggleChecklist={handleToggleChecklist}
                  onAddCustomChecklist={handleAddCustomChecklist}
                  onStartOver={handleStartOver}
                  onUpdateWhatsAppNumber={(phone) => updateState({ whatsappNumber: phone })}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer with Copyright */}
        {currentStep !== 'loading' && (
          <footer className="w-full text-center py-6 px-4 text-xs text-rose-800/70 font-serif flex flex-col items-center justify-center gap-1.5 border-t border-rose-100/60 mt-6">
            <p className="flex items-center justify-center gap-2 font-medium text-rose-900/80 text-xs sm:text-sm">
              <span>Made with all my heart ❤️</span>
              <span>•</span>
              <span>Our Forever Date Journey</span>
            </p>
            <p className="text-[11px] sm:text-xs text-rose-700/80 font-sans tracking-wide">
              © {new Date().getFullYear()} Sumaiya. All Rights Reserved. 💕
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}
