"use client";

import { useMemo, useState } from "react";
import { Exercise, buildLetterOptions, targetLetter } from "@/lib/gameLogic";

export function InsertGame({
  item,
  onResult,
}: {
  item: Extract<Exercise, { type: "insert" }>;
  onResult: (correct: boolean) => void;
}) {
  const target = targetLetter(item.word, item.idx);
  const options = useMemo(() => buildLetterOptions(item.word, item.idx), [item.word, item.idx]);
  const [picked, setPicked] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  function choose(letter: string) {
    if (locked) return;
    const correct = letter === target;
    setPicked(letter);
    setLocked(true);
    if (correct) {
      setTimeout(() => onResult(true), 50);
    } else {
      onResult(false);
      setTimeout(() => {
        setLocked(false);
        setPicked(null);
      }, 500);
    }
  }

  const letters = item.word.split("");

  return (
    <>
      <div className="my-2 text-3xl font-bold tracking-widest sm:text-4xl">
        {letters.map((ch, i) =>
          i === item.idx ? (
            <span key={i} className="border-b-4 border-[#e08a3c] px-1 text-[#e08a3c]">
              _
            </span>
          ) : (
            ch
          )
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {options.map((l) => {
          const state = picked === l ? (l === target ? "correct" : "wrong") : "idle";
          return (
            <button
              key={l}
              disabled={locked && picked !== l}
              onClick={() => choose(l)}
              className={
                "rounded-2xl border-2 px-4 py-3 text-xl font-bold transition active:scale-95 " +
                (state === "correct"
                  ? "border-emerald-500 bg-emerald-50"
                  : state === "wrong"
                  ? "border-rose-500 bg-rose-50"
                  : "border-[#20263a] bg-white")
              }
            >
              {l}
            </button>
          );
        })}
      </div>
      <p className={"mt-3 min-h-6 font-bold " + (picked ? (picked === target ? "text-emerald-600" : "text-rose-600") : "")}>
        {picked ? (picked === target ? `Верно! Слово: ${item.word}` : "Почти! Попробуй ещё раз.") : ""}
      </p>
    </>
  );
}
