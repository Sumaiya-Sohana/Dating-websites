import { DateState } from '../types';

export const LINKED_WHATSAPP_RAW = '01724837714';
export const LINKED_WHATSAPP_DISPLAY = '+880 1724-837714';
export const LINKED_WHATSAPP_FULL = '+8801724837714';

export function cleanWhatsAppNumber(phone?: string): string {
  if (!phone || !phone.trim()) {
    return '8801724837714';
  }
  const digitsOnly = phone.replace(/\D/g, '');
  // If user provided 11 digit Bangladesh number like 01724837714
  if (digitsOnly.startsWith('01') && digitsOnly.length === 11) {
    return `880${digitsOnly.slice(1)}`;
  }
  // If starts with 880
  if (digitsOnly.startsWith('880')) {
    return digitsOnly;
  }
  return digitsOnly || '8801724837714';
}

export function generateWhatsAppUrl(phone: string, message: string): string {
  const encodedText = encodeURIComponent(message);
  const cleanPhone = cleanWhatsAppNumber(phone || LINKED_WHATSAPP_RAW);
  if (cleanPhone) {
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  }
  return `https://api.whatsapp.com/send?text=${encodedText}`;
}

export function formatWhatsAppMessage(state: DateState): string {
  // Format Question Answers
  const q1Text =
    state.likedMe === 'yes'
      ? 'Yes, I do! 💕'
      : state.likedMe === 'no'
      ? 'No 💔 (Wait, really? 🥺)'
      : state.likedMe === 'maybe'
      ? 'Maybe 😳'
      : 'Not answered yet';

  const q2Text =
    state.lovesMe === 'of_course'
      ? 'Of course! 🥰💖'
      : state.lovesMe === 'yes'
      ? 'Yes, I do! ❤️'
      : state.lovesMe === 'no'
      ? 'No 💔 (Ouch! 🥺)'
      : state.lovesMe === 'maybe'
      ? 'Maybe... 🙈'
      : 'Not answered yet';

  const q3Text =
    state.wantsDate === 'yes'
      ? 'Yes, Absolutely! 🌹'
      : state.wantsDate === 'no'
      ? 'No 💔 (Wait, really? 🥺)'
      : state.wantsDate === 'maybe'
      ? 'Maybe... 🙈'
      : 'Not answered yet';

  // Format Date
  let dateText = state.selectedDate || 'Not chosen yet';
  if (state.selectedDate) {
    try {
      const [y, m, d] = state.selectedDate.split('-').map(Number);
      const dObj = new Date(y, m - 1, d);
      dateText = dObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      dateText = state.selectedDate;
    }
  }

  // Foods
  const foodList = [
    ...state.foods,
    ...state.desserts,
    ...state.drinks,
    ...(state.customFood ? [state.customFood] : []),
  ];
  const foodText = foodList.length > 0 ? foodList.join(', ') : 'Surprise snacks';

  // Activities
  const activitiesText =
    state.activities.length > 0 ? state.activities.join(', ') : 'Go with the flow';

  // Vibes
  const vibeText =
    state.dateVibes.length > 0
      ? `${state.dateVibes.join(', ')}${state.mood ? ` (Mood: ${state.mood})` : ''}`
      : state.mood || 'Romantic';

  // Dress Code
  const dressText = `${state.dressCode || 'Comfortable'}${
    state.matchingColor ? ` • Palette: ${state.matchingColor}` : ''
  }`;

  // Confirmed time
  const confirmTime = state.confirmedAt
    ? new Date(state.confirmedAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

  return [
    '💖 *OUR ROMANTIC DATE CONFIRMATION* 💖',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '💌 *LOVE QUESTIONS & ANSWERS:*',
    `• Q1: Do you like me? 🥺`,
    `  👉 *${q1Text}*`,
    `• Q2: Do you love me? 💖`,
    `  👉 *${q2Text}*`,
    `• Q3: Will you go on a date with me? 🌹`,
    `  👉 *${q3Text}*`,
    '',
    '✨ *DATE DETAILS & PLAN:*',
    `📅 *Date:* ${dateText}`,
    `⏰ *Time:* ${state.selectedTime || 'To be decided'}`,
    `📍 *Place:* ${state.selectedPlace || 'Special surprise spot'}`,
    `✨ *Vibe:* ${vibeText}`,
    `👗 *Dress Code:* ${dressText}`,
    `🎯 *Activities:* ${activitiesText}`,
    `🍕 *Food & Treats:* ${foodText}`,
    '',
    ...(state.loveNote?.trim()
      ? [
          '💌 *SPECIAL LOVE NOTE:*',
          `"${state.loveNote.trim()}"`,
          '',
        ]
      : []),
    '💍 *DATE STATUS:* OFFICIALLY CONFIRMED! 🎉',
    `🕒 *Confirmed At:* ${confirmTime}`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '💕 Can\'t wait for our special time together! 🥰❤️',
  ].join('\n');
}
