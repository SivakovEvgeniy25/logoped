"use client";

import { useCallback, useEffect, useState } from "react";
import { GROUPS, GroupKey, hasHard, hasSoft } from "@/lib/soundData";
import { Exercise, Variant, buildRoundQueue } from "@/lib/gameLogic";
import { Progress, loadProgress, saveProgress, levelKey } from "@/lib/progress";

export type Screen = "worlds" | "map" | "variant" | "exercise" | "complete";

export function useGameState() {
  const [screen, setScreen] = useState<Screen>("worlds");
  const [groupKey, setGroupKey] = useState<GroupKey | null>(null);
  const [soundKey, setSoundKey] = useState<string | null>(null);
  const [variant, setVariant] = useState<Variant | null>(null);
  const [queue, setQueue] = useState<Exercise[]>([]);
  const [queueTotal, setQueueTotal] = useState(0);
  const [progress, setProgress] = useState<Progress>({ coins: 0, stars: {} });
  const [streak, setStreak] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Прогресс читаем из localStorage только на клиенте (после гидратации).
  // Это синхронизация с внешней системой (localStorage) при монтировании —
  // намеренно отключаем экспериментальное правило для этого случая.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (hydrated) saveProgress(progress);
  }, [progress, hydrated]);

  const addCoins = useCallback((n: number) => {
    setProgress((p) => ({ ...p, coins: p.coins + n }));
  }, []);

  const registerStars = useCallback((key: string, stars: number) => {
    setProgress((p) => ({ ...p, stars: { ...p.stars, [key]: Math.max(p.stars[key] ?? 0, stars) } }));
  }, []);

  function goWorlds() {
    setScreen("worlds");
    setStreak(0);
  }

  function goMap(g: GroupKey) {
    setGroupKey(g);
    setScreen("map");
  }

  function goVariant(g: GroupKey, s: string) {
    const sound = GROUPS[g].sounds[s];
    setGroupKey(g);
    setSoundKey(s);
    const bothExist = hasHard(sound) && hasSoft(sound);
    if (!bothExist) {
      startRound(g, s, hasHard(sound) ? "hard" : "soft");
      return;
    }
    setScreen("variant");
  }

  function startRound(g: GroupKey, s: string, v: Variant) {
    const sound = GROUPS[g].sounds[s];
    const ex = buildRoundQueue(sound.hard, sound.soft, v);
    setGroupKey(g);
    setSoundKey(s);
    setVariant(v);
    setQueue(ex);
    setQueueTotal(ex.length);
    setStreak(0);
    setScreen("exercise");
  }

  function onExerciseResult(correct: boolean) {
    setStreak((s) => (correct ? s + 1 : 0));
    if (!correct) return;
    setQueue((q) => {
      const rest = q.slice(1);
      if (rest.length === 0 && groupKey && soundKey) {
        registerStars(levelKey(groupKey, soundKey), 3);
        setScreen("complete");
      }
      return rest;
    });
  }

  return {
    screen,
    groupKey,
    soundKey,
    variant,
    queue,
    queueTotal,
    progress,
    streak,
    addCoins,
    goWorlds,
    goMap,
    goVariant,
    startRound,
    onExerciseResult,
    setScreen,
  };
}
