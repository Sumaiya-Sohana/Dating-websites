import { DateState } from '../types';

const STORAGE_KEY = 'romantic_date_experience_data';
const STEP_KEY = 'romantic_date_current_step';

export const initialDateState: DateState = {
  likedMe: null,
  lovesMe: null,
  wantsDate: null,
  dateVibes: [],
  mood: null,
  selectedDate: '',
  selectedTime: '6:30 PM',
  selectedPlace: 'Rooftop / Café',
  dressCode: 'Romantic',
  matchingColor: 'Pink & White',
  activities: ['Talk for hours', 'Watch sunset'],
  foods: ['Pasta', 'Pizza'],
  desserts: ['Brownie', 'Ice Cream'],
  drinks: ['Coffee'],
  customFood: '',
  loveNote: '',
  loveNoteSealed: false,
  confirmed: false,
  confirmedAt: null,
  whatsappNumber: '01724837714',
  checklist: {
    'Pick an outfit': false,
    'Charge your phone': false,
    "Don't forget your smile": true,
    'Take some pictures': false,
    'Be ready on time': false,
    'Most importantly... have fun ❤️': true,
  },
  customChecklist: [],
};

export function loadSavedState(): DateState {
  if (typeof window === 'undefined') return initialDateState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialDateState;
    const parsed = JSON.parse(raw);
    const loaded = { ...initialDateState, ...parsed };
    if (!loaded.whatsappNumber) {
      loaded.whatsappNumber = '01724837714';
    }
    // Clean up previously auto-generated canned messages if stored
    if (
      loaded.loveNote === "Can't wait to look into your eyes and smile across the table. You mean so much to me. ❤️" ||
      loaded.loveNote === "I'm counting down the minutes until we meet. Thank you for making every day feel like a love story. ❤️"
    ) {
      loaded.loveNote = '';
      loaded.loveNoteSealed = false;
    }
    return loaded;
  } catch (e) {
    console.error('Error loading saved date state', e);
    return initialDateState;
  }
}

export function saveDateState(state: DateState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving date state', e);
  }
}

export function loadSavedStep(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STEP_KEY);
}

export function saveSavedStep(step: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STEP_KEY, step);
}

export function clearAllSavedData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STEP_KEY);
}
