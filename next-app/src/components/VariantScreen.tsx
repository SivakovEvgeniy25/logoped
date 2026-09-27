"use client";

import { SoundEntry } from "@/lib/soundData";
import { Variant } from "@/lib/gameLogic";

export function VariantScreen({
  sound,
  soundKey,
  onPick,
}: {
  sound: SoundEntry;
  soundKey: string;
  onPick: (v: Variant) => void;
}) {
  return (
    <div className="mt-2 rounded-3xl bg-[#fffaf0] p-6 text-center shadow-lg">
      <div className="text-5xl">{sound.emoji}</div>
      <h2 className="mt-2 text-xl font-bold">Звук [{soundKey}]</h2>
      <p className="text-sm">Какой звук будем тренировать?</p>
      <div className="mt-4 flex flex-col gap-3">
        <button
          onClick={() => onPick("hard")}
          className="rounded-2xl border-[3px] border-[#3a6ea5] bg-white p-3 font-bold active:scale-[0.98]"
        >
          🔵 Твёрдый ({sound.hard?.[0].word})
        </button>
        <button
          onClick={() => onPick("soft")}
          className="rounded-2xl border-[3px] border-[#4caf7d] bg-white p-3 font-bold active:scale-[0.98]"
        >
          🟢 Мягкий ({sound.soft?.[0].word})
        </button>
        <button
          onClick={() => onPick("both")}
          className="rounded-2xl border-[3px] border-[#e08a3c] bg-white p-3 font-bold active:scale-[0.98]"
        >
          🟠 Оба вместе — учимся различать
        </button>
      </div>
    </div>
  );
}
