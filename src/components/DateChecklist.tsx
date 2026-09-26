import React, { useState } from 'react';
import { CheckSquare, Square, Heart, Sparkles, Plus, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface DateChecklistProps {
  checklist: Record<string, boolean>;
  customChecklist: string[];
  onToggleItem: (key: string) => void;
  onAddCustomItem: (item: string) => void;
}

export const DateChecklist: React.FC<DateChecklistProps> = ({
  checklist,
  customChecklist,
  onToggleItem,
  onAddCustomItem,
}) => {
  const [newItem, setNewItem] = useState('');

  const handleToggle = (key: string) => {
    romanticAudio.playChime('medium');
    onToggleItem(key);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    onAddCustomItem(newItem.trim());
    setNewItem('');
    romanticAudio.playChime('high');
  };

  const allKeys = [
    'Pick an outfit',
    'Charge your phone',
    "Don't forget your smile",
    'Take some pictures',
    'Be ready on time',
    'Most importantly... have fun ❤️',
    ...customChecklist,
  ];

  const completedCount = allKeys.filter((k) => checklist[k]).length;
  const progressPercent = Math.round((completedCount / allKeys.length) * 100);

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/90 border border-rose-100 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-950 flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            Before Our Date 💕
          </h3>
          <p className="text-xs text-slate-500">
            A little reminder checklist so everything goes smoothly
          </p>
        </div>

        {/* Progress badge */}
        <div className="text-right">
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            {completedCount}/{allKeys.length} Ready ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* Progress mini bar */}
      <div className="w-full h-1.5 bg-rose-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Items list */}
      <div className="space-y-2 mb-4">
        {allKeys.map((itemKey) => {
          const isChecked = !!checklist[itemKey];

          return (
            <button
              key={itemKey}
              type="button"
              id={`checklist-item-${itemKey.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => handleToggle(itemKey)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-150 cursor-pointer ${
                isChecked
                  ? 'bg-rose-50/60 border-rose-300 text-rose-950 font-medium'
                  : 'bg-white border-slate-200/80 text-slate-700 hover:border-rose-200 hover:bg-rose-50/30'
              }`}
            >
              <span className={`text-sm ${isChecked ? 'line-through text-rose-800/80' : ''}`}>
                {itemKey}
              </span>

              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  isChecked
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Add custom item form */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add your own reminder..."
          className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border border-rose-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-rose-400 focus:bg-white"
        />
        <button
          type="submit"
          id="add-custom-checklist-btn"
          className="px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-medium text-xs flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>
    </div>
  );
};
