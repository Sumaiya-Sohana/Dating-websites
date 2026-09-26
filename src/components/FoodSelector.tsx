import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Cake, Wine, Plus, Check, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface FoodSelectorProps {
  foods: string[];
  desserts: string[];
  drinks: string[];
  customFood: string;
  onChangeFoods: (foods: string[]) => void;
  onChangeDesserts: (desserts: string[]) => void;
  onChangeDrinks: (drinks: string[]) => void;
  onChangeCustomFood: (custom: string) => void;
  onNext: () => void;
}

const FOOD_ITEMS = [
  { id: 'Pizza', emoji: '🍕' },
  { id: 'Burger', emoji: '🍔' },
  { id: 'Pasta', emoji: '🍝' },
  { id: 'Biryani', emoji: '🍛' },
  { id: 'Fried Rice', emoji: '🍚' },
  { id: 'Noodles', emoji: '🍜' },
  { id: 'Chicken', emoji: '🍗' },
  { id: 'French Fries', emoji: '🍟' },
];

const DESSERT_ITEMS = [
  { id: 'Cake', emoji: '🎂' },
  { id: 'Ice Cream', emoji: '🍨' },
  { id: 'Brownie', emoji: '🍫' },
  { id: 'Chocolate', emoji: '🍬' },
  { id: 'Waffle', emoji: '🧇' },
];

const DRINK_ITEMS = [
  { id: 'Coffee', emoji: '☕' },
  { id: 'Milkshake', emoji: '🥤' },
  { id: 'Juice', emoji: '🧃' },
  { id: 'Tea', emoji: '🍵' },
  { id: 'Soft Drink', emoji: '🍹' },
];

export const FoodSelector: React.FC<FoodSelectorProps> = ({
  foods,
  desserts,
  drinks,
  customFood,
  onChangeFoods,
  onChangeDesserts,
  onChangeDrinks,
  onChangeCustomFood,
  onNext,
}) => {
  const toggleItem = (
    list: string[],
    item: string,
    setter: (items: string[]) => void
  ) => {
    romanticAudio.playChime('medium');
    if (list.includes(item)) {
      setter(list.filter((x) => x !== item));
    } else {
      setter([...list, item]);
    }
  };

  const totalSelected = foods.length + desserts.length + drinks.length + (customFood.trim() ? 1 : 0);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Utensils className="w-3.5 h-3.5 text-rose-500" /> Delicious Choices
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-bold mb-2">
            Now the most important question... FOOD! 😋❤️
          </h2>
          <p className="text-slate-600 font-sans text-sm">
            Pick what our cravings desire (Multiple choices allowed)
          </p>
        </div>

        {/* Category: Food */}
        <div className="mb-7">
          <h3 className="font-serif text-xl font-bold text-rose-950 mb-3 flex items-center gap-2">
            <span>🍕 Food Favorites</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {FOOD_ITEMS.map((item) => {
              const isSelected = foods.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`food-${item.id.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => toggleItem(foods, item.id, onChangeFoods)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-200 shadow-xs'
                      : 'bg-white/90 border-slate-200 hover:border-rose-300'
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium text-sm text-slate-800">
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.id}</span>
                  </span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category: Dessert */}
        <div className="mb-7">
          <h3 className="font-serif text-xl font-bold text-rose-950 mb-3 flex items-center gap-2">
            <Cake className="w-5 h-5 text-rose-500" />
            <span>🍰 Sweet Desserts</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {DESSERT_ITEMS.map((item) => {
              const isSelected = desserts.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`dessert-${item.id.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => toggleItem(desserts, item.id, onChangeDesserts)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-pink-100 border-pink-400 ring-2 ring-pink-200 shadow-xs'
                      : 'bg-white/90 border-slate-200 hover:border-pink-300'
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium text-sm text-slate-800">
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.id}</span>
                  </span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category: Drinks */}
        <div className="mb-7">
          <h3 className="font-serif text-xl font-bold text-rose-950 mb-3 flex items-center gap-2">
            <Wine className="w-5 h-5 text-rose-500" />
            <span>🥤 Refreshing Drinks</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {DRINK_ITEMS.map((item) => {
              const isSelected = drinks.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`drink-${item.id.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => toggleItem(drinks, item.id, onChangeDrinks)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-200 shadow-xs'
                      : 'bg-white/90 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium text-sm text-slate-800">
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.id}</span>
                  </span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom food input */}
        <div className="border-t border-rose-100 pt-5 mb-8">
          <label
            htmlFor="custom-food-input"
            className="block font-serif text-base font-semibold text-rose-950 mb-2"
          >
            Something else you'd love? 😋
          </label>
          <div className="relative">
            <input
              id="custom-food-input"
              type="text"
              value={customFood}
              onChange={(e) => onChangeCustomFood(e.target.value)}
              placeholder="Tell me what you want to eat... 😋"
              className="w-full px-4 py-3 rounded-2xl bg-white border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-slate-800 placeholder:text-slate-400 font-sans text-sm transition-all"
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            id="food-next-btn"
            disabled={totalSelected === 0}
            onClick={onNext}
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base shadow-lg transition-all duration-200 ${
              totalSelected > 0
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300 hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Write Love Note 💌</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
