import React from 'react';
import { Sparkles, Heart, Compass, Calendar, Clock, MapPin, Utensils, Ticket } from 'lucide-react';
import { Step } from '../types';

interface RomanticProgressBarProps {
  currentStep: Step;
  onNavigateStep?: (step: Step) => void;
  canNavigate?: boolean;
}

interface NavStep {
  key: string;
  step: Step;
  label: string;
  icon: React.FC<{ className?: string }>;
  associatedSteps: Step[];
}

const NAV_STEPS: NavStep[] = [
  { key: 'surprise', step: 'surprise', label: 'Surprise', icon: Sparkles, associatedSteps: ['surprise'] },
  { key: 'questions', step: 'questions', label: 'Questions', icon: Heart, associatedSteps: ['questions', 'yay_date'] },
  { key: 'vibe', step: 'vibe_mood', label: 'Vibe', icon: Compass, associatedSteps: ['vibe_mood'] },
  { key: 'date', step: 'date', label: 'Date', icon: Calendar, associatedSteps: ['date'] },
  { key: 'time', step: 'time', label: 'Time', icon: Clock, associatedSteps: ['time'] },
  { key: 'place', step: 'place', label: 'Place', icon: MapPin, associatedSteps: ['place', 'dress_code', 'activities'] },
  { key: 'food', step: 'food', label: 'Food', icon: Utensils, associatedSteps: ['food', 'love_note'] },
  { key: 'invitation', step: 'invitation', label: 'Invitation', icon: Ticket, associatedSteps: ['invitation', 'review', 'confirmation'] },
];

export const RomanticProgressBar: React.FC<RomanticProgressBarProps> = ({
  currentStep,
  onNavigateStep,
  canNavigate = false,
}) => {
  if (currentStep === 'loading') return null;

  // Find index of current step
  const activeIndex = NAV_STEPS.findIndex((s) => s.associatedSteps.includes(currentStep));
  const currentIdx = activeIndex === -1 ? 0 : activeIndex;

  return (
    <nav aria-label="Progress" className="w-full max-w-4xl mx-auto px-3 sm:px-6 mb-6">
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 border border-rose-100 shadow-xs">
        {/* Progress track */}
        <div className="relative flex items-center justify-between">
          {/* Background connect line */}
          <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1 bg-rose-100/90 rounded-full z-0">
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(currentIdx / (NAV_STEPS.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Step items */}
          {NAV_STEPS.map((step, index) => {
            const isCompleted = index < currentIdx;
            const isCurrent = index === currentIdx;
            const Icon = step.icon;
            const isClickable = canNavigate;

            return (
              <button
                key={step.key}
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onNavigateStep && onNavigateStep(step.step)}
                id={`progress-step-${step.key}`}
                className={`group relative z-10 flex flex-col items-center focus:outline-none ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
                title={step.label}
              >
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-300 scale-110 ring-4 ring-rose-100'
                      : isCompleted
                      ? 'bg-rose-200 text-rose-800'
                      : 'bg-white text-rose-300 border border-rose-100'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110" />
                </div>

                <span
                  className={`hidden md:block mt-1.5 text-[11px] font-medium tracking-tight whitespace-nowrap transition-colors ${
                    isCurrent
                      ? 'text-rose-700 font-semibold'
                      : isCompleted
                      ? 'text-slate-600'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
