import confetti from 'canvas-confetti';

export function triggerLoveBurst() {
  if (typeof window === 'undefined') return;

  const count = 40;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#ff4d6d', '#ff758f', '#ff8fa3', '#c9184a'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#ffccd5', '#fff0f3', '#ffb3c1'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#e0aaff', '#c77dff', '#ff4d6d'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#ffd166', '#ff758f'],
  });
}

export function triggerBigCelebration() {
  if (typeof window === 'undefined') return;

  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#ff4d6d', '#ff758f', '#ffd166', '#f72585', '#b5179e', '#ffffff'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#ff758f', '#ff8fa3', '#e0aaff', '#ffd166', '#ff4d6d', '#ffffff'],
    });
  }, 250);
}

export function triggerHeartShower() {
  if (typeof window === 'undefined') return;

  confetti({
    particleCount: 60,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#ff4d6d', '#e63946', '#ff758f', '#ffd166'],
    shapes: ['circle'],
    scalar: 1.1,
    zIndex: 9999,
  });
}
