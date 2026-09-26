import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Music, Volume2, VolumeX, Heart, Disc, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface PlaylistSelectorProps {
  playlistPreference: string;
  favoriteSong: string;
  onSelectPreference: (pref: string) => void;
  onChangeFavoriteSong: (song: string) => void;
  onNext: () => void;
}

const PLAYLIST_VIBES = [
  { id: 'Romantic', label: 'Romantic', icon: '💕', desc: 'Acoustic love songs, warm guitar & slow dance melodies' },
  { id: 'Soft & Calm', label: 'Soft & Calm', icon: '🌸', desc: 'Lo-fi chill beats, soft piano & gentle ambiance' },
  { id: 'Fun & Happy', label: 'Fun & Happy', icon: '😂', desc: 'Upbeat pop, cheerful rhythms & singing along' },
  { id: 'Your Favorite Songs', label: 'Your Favorite Songs', icon: '🎵', desc: 'Handpicked tracks that make your heart smile' },
];

export const PlaylistSelector: React.FC<PlaylistSelectorProps> = ({
  playlistPreference,
  favoriteSong,
  onSelectPreference,
  onChangeFavoriteSong,
  onNext,
}) => {
  const [isPlaying, setIsPlaying] = useState(romanticAudio.getIsPlaying());

  const handleToggle = () => {
    const active = romanticAudio.toggleMusic((st) => setIsPlaying(st));
    setIsPlaying(active);
  };

  const handleSelect = (id: string) => {
    romanticAudio.playChime('medium');
    onSelectPreference(id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/40">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Music className="w-3.5 h-3.5 text-rose-500" /> Audio Soundtrack
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-bold mb-2">
            Should we have a soundtrack for our date? 🎶
          </h2>
          <p className="text-slate-600 font-sans text-sm">
            Music makes memories last forever
          </p>
        </div>

        {/* Live Audio player banner */}
        <div className="bg-gradient-to-r from-rose-100/80 via-pink-50 to-rose-100/80 rounded-2xl p-4 sm:p-5 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPlaying ? 'bg-rose-500 text-white animate-spin' : 'bg-rose-200 text-rose-800'}`}>
              <Disc className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-rose-950 text-base">
                Romantic Melody Generator
              </h4>
              <p className="text-xs text-rose-700/80">
                {isPlaying ? 'Currently playing gentle music box chords' : 'Click play to listen to our romantic ambiance'}
              </p>
            </div>
          </div>

          <button
            id="playlist-music-toggle-btn"
            type="button"
            onClick={handleToggle}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm shadow-md transition-all cursor-pointer ${
              isPlaying
                ? 'bg-rose-500 text-white shadow-rose-300'
                : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Music Playing (Click to Mute)</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Play Romantic Music 🔊</span>
              </>
            )}
          </button>
        </div>

        {/* Playlist vibe cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
          {PLAYLIST_VIBES.map((vibe) => {
            const isSelected = playlistPreference === vibe.id;

            return (
              <motion.button
                key={vibe.id}
                type="button"
                id={`playlist-btn-${vibe.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => handleSelect(vibe.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50/95 border-rose-400 ring-2 ring-rose-300 shadow-md shadow-rose-200'
                    : 'bg-white/90 border-slate-200/90 hover:border-rose-300'
                }`}
              >
                <span className="text-3xl mt-0.5">{vibe.icon}</span>
                <div>
                  <h4 className="font-semibold text-rose-950 text-base mb-1">
                    {vibe.label}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {vibe.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Favorite song input */}
        <div className="border-t border-rose-100 pt-5 mb-8">
          <label
            htmlFor="favorite-song-input"
            className="block font-serif text-base font-semibold text-rose-950 mb-2 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            Our song / favorite song
          </label>
          <input
            id="favorite-song-input"
            type="text"
            value={favoriteSong}
            onChange={(e) => onChangeFavoriteSong(e.target.value)}
            placeholder="e.g. Perfect - Ed Sheeran, or your favorite track..."
            className="w-full px-4 py-3 rounded-2xl bg-white border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-slate-800 placeholder:text-slate-400 font-sans text-sm transition-all"
          />
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            id="playlist-next-btn"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base shadow-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Write Love Note 💌</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
