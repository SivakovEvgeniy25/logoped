"use client";

export function CompleteScreen({
  soundKey,
  coins,
  onMap,
  onWorlds,
}: {
  soundKey: string;
  coins: number;
  onMap: () => void;
  onWorlds: () => void;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl bg-[#fffaf0] p-6 text-center shadow-lg">
      <div className="text-7xl">🏆</div>
      <h2 className="mt-2 text-xl font-bold">Уровень «{soundKey}» пройден!</h2>
      <p>Собрано монет: 🪙 {coins}</p>
      <button onClick={onMap} className="mt-3 rounded-2xl bg-[#e08a3c] px-5 py-3 font-bold text-white shadow-[0_4px_0_#a85f1e] active:translate-y-1 active:shadow-none">
        К карте острова
      </button>
      <button onClick={onWorlds} className="mt-2 rounded-2xl bg-[#3a6ea5] px-5 py-3 font-bold text-white shadow-[0_4px_0_#234a72] active:translate-y-1 active:shadow-none">
        Все острова
      </button>
    </div>
  );
}
