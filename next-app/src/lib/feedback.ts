let audioCtx: AudioContext | null = null;

function beep(freq: number, dur: number, type: OscillatorType = "sine") {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = audioCtx || new Ctx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
  } catch {
    // звук — необязательная деталь интерфейса
  }
}

export function playCorrect(): void {
  beep(660, 0.12);
  setTimeout(() => beep(880, 0.15), 90);
}

export function playWrong(): void {
  beep(160, 0.2, "sawtooth");
}

/** Рисует короткий залп конфетти на переданном canvas. */
export function burstConfetti(canvas: HTMLCanvasElement | null): void {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ["#ffd166", "#4caf7d", "#3a6ea5", "#e2596b", "#e08a3c"];
  const particles = Array.from({ length: 36 }).map(() => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 120,
    y: canvas.height * 0.35,
    vx: (Math.random() - 0.5) * 8,
    vy: -Math.random() * 6 - 2,
    size: 5 + Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI,
  }));
  let frame = 0;
  function tick() {
    frame++;
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    particles.forEach((p) => {
      p.vy += 0.18;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += 0.15;
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rot);
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx!.restore();
    });
    if (frame < 55) requestAnimationFrame(tick);
    else ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
  }
  tick();
}
