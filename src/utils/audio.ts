// Romantic Web Audio Synthesizer for ambient music and chime micro-interactions
class RomanticAudio {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  // Play a soft romantic note (sine with soft envelope like a music box/celesta)
  private playRomanticTone(freq: number, time: number, duration: number = 1.2) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Warm harmonics
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq, time);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.3, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.2, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    osc2.connect(gain2);
    gain2.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + duration);
    osc2.stop(time + duration);
  }

  public toggleMusic(onStateChange?: (playing: boolean) => void): boolean {
    this.initCtx();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stopMusic();
      onStateChange?.(false);
      return false;
    } else {
      this.startMusic();
      onStateChange?.(true);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public startMusic() {
    this.initCtx();
    if (!this.ctx || this.isPlaying) return;

    this.isPlaying = true;

    // Romantic chord progression arpeggios (Cadd9, Am7, Fmaj7, Gsus4)
    const chords = [
      [261.63, 329.63, 392.0, 587.33], // C, E, G, D
      [220.0, 261.63, 329.63, 440.0],  // A, C, E, A
      [174.61, 261.63, 349.23, 523.25], // F, C, F, C5
      [196.0, 293.66, 392.0, 587.33],  // G, D, G, D5
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const playLoop = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const currentChord = chords[chordIdx];
      const noteFreq = currentChord[noteIdx];

      this.playRomanticTone(noteFreq, now, 1.4);

      noteIdx++;
      if (noteIdx >= currentChord.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }

      this.timerId = window.setTimeout(playLoop, 550);
    };

    playLoop();
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  // Soft sparkle sound effect for interactions
  public playChime(pitch: 'high' | 'medium' | 'happy' = 'medium') {
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const freqs =
      pitch === 'high'
        ? [523.25, 659.25, 783.99, 1046.5]
        : pitch === 'happy'
        ? [392.0, 523.25, 659.25, 783.99]
        : [329.63, 392.0, 523.25];

    freqs.forEach((freq, idx) => {
      this.playRomanticTone(freq, now + idx * 0.08, 0.8);
    });
  }
}

export const romanticAudio = new RomanticAudio();
