export type Progress = {
  coins: number;
  stars: Record<string, number>; // ключ вида "front-Р" -> количество звёзд (0-3)
};

const STORAGE_KEY = "logoped-progress-v1";
const EMPTY: Progress = { coins: 0, stars: {} };

export function loadProgress(): Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Progress) : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function saveProgress(p: Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // тихо игнорируем — прогресс необязателен для игры
  }
}

export function levelKey(groupKey: string, soundKey: string): string {
  return `${groupKey}-${soundKey}`;
}
