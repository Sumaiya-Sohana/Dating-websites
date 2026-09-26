export type Step =
  | 'loading'
  | 'surprise'
  | 'questions'
  | 'yay_date'
  | 'vibe_mood'
  | 'date'
  | 'time'
  | 'place'
  | 'dress_code'
  | 'activities'
  | 'food'
  | 'love_note'
  | 'invitation'
  | 'review'
  | 'confirmation';

export interface DateState {
  likedMe: 'yes' | 'maybe' | 'no' | null;
  lovesMe: 'yes' | 'of_course' | 'maybe' | 'no' | null;
  wantsDate: 'yes' | 'maybe' | 'no' | null;
  
  dateVibes: string[];
  mood: string | null;
  
  selectedDate: string; // ISO format or YYYY-MM-DD
  selectedTime: string;
  selectedPlace: string;
  
  dressCode: string;
  matchingColor: string;
  
  activities: string[];
  
  foods: string[];
  desserts: string[];
  drinks: string[];
  customFood: string;
  
  loveNote: string;
  loveNoteSealed: boolean;
  
  confirmed: boolean;
  confirmedAt: string | null;
  
  whatsappNumber: string;
  
  checklist: Record<string, boolean>;
  customChecklist: string[];
}

export interface StepInfo {
  id: Step;
  label: string;
  iconName: string;
  shortLabel: string;
}
