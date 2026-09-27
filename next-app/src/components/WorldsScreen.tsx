"use client";

import { GROUPS, GroupKey } from "@/lib/soundData";
import { Progress } from "@/lib/progress";

export function WorldsScreen({
  progress,
  onPick,
}: {
  progress: Progress;
  onPick: (g: GroupKey) => void;
}) {
  return (
    <div className="flex flex-col gap-4 mt-2">
      {(Object.entries(GROUPS) as [GroupKey, (typeof GROUPS)[GroupKey]][]).map(([key, g]) => {
        const soundKeys = Object.keys(g.sounds);
        const earned = soundKeys.reduce((sum, sk) => sum + (progress.stars[`${key}-${sk}`] ?? 0), 0);
        const total = soundKeys.length * 3;
        return (
          <button
            key={key}
            onClick={() => onPick(key)}
            className="relative flex items-center gap-4 rounded-3xl p-5 text-left text-white shadow-lg shadow-black/30 transition active:scale-[0.98]"
            style={{ background: `linear-gradient(160deg, ${g.gradientFrom}, ${g.gradientTo})` }}
          >
            <span className="absolute right-4 top-4 rounded-lg bg-black/35 px-2 py-1 text-xs">
              ⭐ {earned}/{total}
            </span>
            <span className="text-5xl animate-bounce [animation-duration:3s]">{g.mascot}</span>
            <span>
              <h2 className="text-xl font-bold">{g.title}</h2>
              <p className="text-sm opacity-90">{g.subtitle}</p>
            </span>
          </button>
        );
      })}
    </div>
  );
}
