"use client";

import { useMemo } from "react";

export function Blobs({ color, seed }: { color: string; seed: string }) {
  // Случайные позиции — чисто декоративный эффект (не влияет на игровую логику),
  // поэтому намеренно отключаем строгое правило чистоты рендера для этого блока.
  /* eslint-disable react-hooks/purity, react-hooks/exhaustive-deps */
  const blobs = useMemo(
    () =>
      Array.from({ length: 6 }).map(() => ({
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
        size: 60 + Math.random() * 140,
        delay: `${(Math.random() * 6).toFixed(1)}s`,
      })),
    [seed]
  );
  /* eslint-enable react-hooks/purity, react-hooks/exhaustive-deps */
  return (
    <>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full opacity-20 blur-[2px] motion-safe:animate-[float_14s_ease-in-out_infinite]"
          style={{ top: b.top, left: b.left, width: b.size, height: b.size, background: color, animationDelay: b.delay }}
        />
      ))}
    </>
  );
}
