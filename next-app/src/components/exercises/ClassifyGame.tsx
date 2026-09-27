"use client";

import { useState } from "react";
import { Exercise } from "@/lib/gameLogic";

export function ClassifyGame({
  item,
  soundKey,
  onResult,
}: {
  item: Extract<Exercise, { type: "classify" }>;
  soundKey: string;
  onResult: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<"hard" | "soft" | null>(null);
  const [locked, setLocked] = useState(false);

  function choose(choice: "hard" | "soft") {
    if (locked) return;
    const correct = choice === item.hardness;
    setPicked(choice);
    setLocked(true);
    if (correct) setTimeout(() => onResult(true), 50);
    else {
      onResult(false);
      setTimeout(() => {
        setLocked(false);
        setPicked(null);
      }, 500);
    }
  }

  return (
    <>
      <div className="my-2 text-3xl font-bold tracking-widest sm:text-4xl">{item.word.toUpperCase()}</div>
      <p className="-mt-1 text-sm">Звук [{soundKey}] в этом слове...</p>
      <div className="mt-3 flex w-full gap-3">
        <button
          disabled={locked && picked !== "hard"}
          onClick={() => choose("hard")}
          className={
            "flex-1 min-w-[130px] rounded-2xl border-4 bg-[#3a6ea5] p-5 font-bold text-white transition active:scale-95 " +
            (picked === "hard" ? (item.hardness === "hard" ? "border-amber-300" : "border-rose-500") : "border-transparent")
          }
        >
          🔵 Твёрдый
        </button>
        <button
          disabled={locked && picked !== "soft"}
          onClick={() => choose("soft")}
          className={
            "flex-1 min-w-[130px] rounded-2xl border-4 bg-[#4caf7d] p-5 font-bold text-white transition active:scale-95 " +
            (picked === "soft" ? (item.hardness === "soft" ? "border-amber-300" : "border-rose-500") : "border-transparent")
          }
        >
          🟢 Мягкий
        </button>
      </div>
      <p className={"mt-3 min-h-6 font-bold " + (picked ? (picked === item.hardness ? "text-emerald-600" : "text-rose-600") : "")}>
        {picked ? (picked === item.hardness ? "Точно! Молодец!" : "Не совсем — послушай слово ещё раз.") : ""}
      </p>
    </>
  );
}
