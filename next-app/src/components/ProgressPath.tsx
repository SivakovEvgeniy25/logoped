export function ProgressPath({ total, done }: { total: number; done: number }) {
  return (
    <div className="mb-3 flex justify-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={
            "h-3 w-3 rounded-full transition " +
            (i < done ? "bg-amber-300" : i === done ? "scale-125 bg-white" : "bg-white/30")
          }
        />
      ))}
    </div>
  );
}
