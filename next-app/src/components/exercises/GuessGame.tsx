"use client";

import { useMemo, useState } from "react";
import { Exercise, buildWordOptions, maskWord } from "@/lib/gameLogic";

export function GuessGame({
  item,
  onResult,
}: {
  item: Extract<Exercise, { type: "guess" }>;
  onResult: (correct: boolean) => void;
}) {
  const masked = maskWord(item.word);
  const options = useMemo(() => buildWordOptions(item.word), [item.word]);
  const [picked, setPicked] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  function choose(word: string) {
    if (locked) return;
    const correct = word === item.word;
    setPicked(word);
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
      <div className="my-2 text-3xl font-bold tracking-widest sm:text-4xl">{masked}</div>
      <div className="flex flex-wrap justify-center gap-2">
        {options.map((w) => {
          const state = picked === w ? (w === item.word ? "correct" : "wrong") : "idle";
          return (
            <button
              key={w}
              disabled={locked && picked !== w}
              onClick={() => choose(w)}
              className={
                "rounded-2xl border-2 px-4 py-3 font-bold transition active:scale-95 " +
                (state === "correct"
                  ? "border-emerald-500 bg-emerald-50"
                  : state === "wrong"
                  ? "border-rose-500 bg-rose-50"
                  : "border-[#20263a] bg-white")
              }
            >
              {w}
            </button>
          );
        })}
      </div>
      <p className={"mt-3 min-h-6 font-bold " + (picked ? (picked === item.word ? "text-emerald-600" : "text-rose-600") : "")}>
        {picked ? (picked === item.word ? "Отлично, слово угадано!" : "Не то слово — смотри на картинку!") : ""}
      </p>
    </>
  );
}
