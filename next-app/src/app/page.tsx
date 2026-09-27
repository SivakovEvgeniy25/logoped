"use client";

import { useRef } from "react";
import { GROUPS } from "@/lib/soundData";
import { useGameState } from "@/hooks/useGameState";
import { WorldsScreen } from "@/components/WorldsScreen";
import { MapScreen } from "@/components/MapScreen";
import { VariantScreen } from "@/components/VariantScreen";
import { ExerciseScreen } from "@/components/ExerciseScreen";
import { CompleteScreen } from "@/components/CompleteScreen";
import { Blobs } from "@/components/Blobs";

export default function Home() {
  const {
    screen,
    groupKey,
    soundKey,
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
  } = useGameState();

  const confettiRef = useRef<HTMLCanvasElement>(null);
  const group = groupKey ? GROUPS[groupKey] : null;
  const bg = group ? `linear-gradient(160deg, ${group.gradientFrom}, ${group.gradientTo})` : "#141830";

  function goBack() {
    if (screen === "map") goWorlds();
    else if (screen === "variant" && groupKey) goMap(groupKey);
    else if (screen === "exercise" && groupKey && soundKey) {
      const sound = GROUPS[groupKey].sounds[soundKey];
      const bothExist = !!sound.hard && !!sound.soft;
      setScreen(bothExist ? "variant" : "map");
    } else if (screen === "complete" && groupKey) goMap(groupKey);
  }

  return (
    <div className="relative min-h-screen overflow-hidden transition-[background] duration-500" style={{ background: bg }}>
      {group && <Blobs color={group.accent} seed={groupKey ?? ""} />}
      <canvas ref={confettiRef} className="pointer-events-none fixed inset-0 z-50" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col px-4 pb-6">
        <div className="flex items-center justify-between py-3 text-white">
          <h1 className="text-xl font-bold drop-shadow sm:text-2xl">🎮 Звуковые острова</h1>
          <div className="rounded-full bg-black/35 px-3 py-1.5 font-bold text-amber-300">🪙 {progress.coins}</div>
        </div>

        {streak >= 3 && screen === "exercise" && (
          <div className="px-1 pb-1 text-right text-xs text-amber-300">🔥 Серия побед: {streak}</div>
        )}

        {screen !== "worlds" && (
          <button onClick={goBack} className="mb-2 self-start rounded-xl bg-white/15 px-3 py-1.5 text-sm text-white">
            ← Назад
          </button>
        )}

        <div className="flex-1">
          {screen === "worlds" && <WorldsScreen progress={progress} onPick={goMap} />}

          {screen === "map" && group && groupKey && (
            <MapScreen group={group} groupKey={groupKey} progress={progress} onPick={(s) => goVariant(groupKey, s)} />
          )}

          {screen === "variant" && group && soundKey && groupKey && (
            <VariantScreen sound={group.sounds[soundKey]} soundKey={soundKey} onPick={(v) => startRound(groupKey, soundKey, v)} />
          )}

          {screen === "exercise" && queue.length > 0 && soundKey && (
            <ExerciseScreen
              item={queue[0]}
              soundKey={soundKey}
              queueTotal={queueTotal}
              doneCount={queueTotal - queue.length}
              confettiRef={confettiRef}
              onResult={(correct) => {
                if (correct) addCoins(1 + (streak >= 2 ? 1 : 0));
                onExerciseResult(correct);
              }}
            />
          )}

          {screen === "complete" && soundKey && (
            <CompleteScreen soundKey={soundKey} coins={progress.coins} onMap={() => groupKey && goMap(groupKey)} onWorlds={goWorlds} />
          )}
        </div>
      </div>
    </div>
  );
}
