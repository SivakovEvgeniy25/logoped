"use client";

import { SoundGroup } from "@/lib/soundData";
import { Progress } from "@/lib/progress";

export function MapScreen({
  group,
  groupKey,
  progress,
  onPick,
}: {
  group: SoundGroup;
  groupKey: string;
  progress: Progress;
  onPick: (soundKey: string) => void;
}) {
  return (
    <div>
      <div className="mb-4 text-center text-white">
        <div className="text-6xl animate-bounce [animation-duration:3s]">{group.mascot}</div>
        <h2 className="mt-1 text-xl font-bold">{group.title}</h2>
        <p className="text-sm opacity-85">{group.subtitle}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(group.sounds).map(([sk, s]) => {
          const stars = progress.stars[`${groupKey}-${sk}`] ?? 0;
          return (
            <button
              key={sk}
              onClick={() => onPick(sk)}
              className="relative flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-white text-2xl font-bold text-[#3a2a00] shadow-[0_6px_0_rgba(0,0,0,0.35)] transition active:translate-y-1 active:shadow-none"
              style={{ background: group.accent }}
            >
              <span>{sk}</span>
              <span className="text-xs font-normal">{s.emoji}</span>
              {stars > 0 && (
                <span className="absolute -bottom-3 text-xs text-amber-300 drop-shadow">
                  {"⭐".repeat(stars)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
