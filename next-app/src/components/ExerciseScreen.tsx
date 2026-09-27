"use client";

import { useState } from "react";
import { Exercise } from "@/lib/gameLogic";
import { playCorrect, playWrong, burstConfetti } from "@/lib/feedback";
import { ProgressPath } from "./ProgressPath";
import { InsertGame } from "./exercises/InsertGame";
import { GuessGame } from "./exercises/GuessGame";
import { ClassifyGame } from "./exercises/ClassifyGame";

const badgeColor = (h: "hard" | "soft") => (h === "hard" ? "#3a6ea5" : "#4caf7d");
const badgeText = (h: "hard" | "soft") => (h === "hard" ? "Твёрдый звук" : "Мягкий звук");

export function ExerciseScreen({
  item,
  soundKey,
  queueTotal,
  doneCount,
  confettiRef,
  onResult,
}: {
  item: Exercise;
  soundKey: string;
  queueTotal: number;
  doneCount: number;
  confettiRef: React.RefObject<HTMLCanvasElement | null>;
  onResult: (correct: boolean) => void;
}) {
  const [shake, setShake] = useState(false);
  const [win, setWin] = useState(false);

  function handle(correct: boolean) {
    if (correct) {
      playCorrect();
      burstConfetti(confettiRef.current);
      setWin(true);
      setTimeout(() => onResult(true), 700);
    } else {
      playWrong();
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }

  return (
    <>
      <ProgressPath total={queueTotal} done={doneCount} />
      <div
        className={
          "flex flex-col items-center rounded-3xl bg-[#fffaf0] p-6 text-center shadow-lg " +
          (shake ? "animate-[shake_0.4s]" : "")
        }
      >
        <span className="mb-2 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: badgeColor(item.hardness) }}>
          {badgeText(item.hardness)}
        </span>
        <div className={"text-7xl transition-transform " + (win ? "scale-125 rotate-6" : "")}>{item.pic}</div>
        {item.type === "insert" && <InsertGame item={item} onResult={handle} />}
        {item.type === "guess" && <GuessGame item={item} onResult={handle} />}
        {item.type === "classify" && <ClassifyGame item={item} soundKey={soundKey} onResult={handle} />}
      </div>
    </>
  );
}
