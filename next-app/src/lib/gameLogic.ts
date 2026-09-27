import { ALL_LETTERS, ALL_WORDS_FLAT, Hardness, WordEntry } from "./soundData";

/** Перемешивает массив (Fisher–Yates), не мутируя исходный. */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Один тип упражнения в очереди уровня. */
export type Exercise =
  | ({ type: "insert" } & WordEntry & { hardness: Hardness })
  | ({ type: "guess" } & WordEntry & { hardness: Hardness })
  | ({ type: "classify" } & WordEntry & { hardness: Hardness });

export type Variant = Hardness | "both";

/** Собирает очередь упражнений для одного уровня (звука + варианта твёрдости). */
export function buildRoundQueue(
  hardWords: WordEntry[] | undefined,
  softWords: WordEntry[] | undefined,
  variant: Variant,
  wordLimit = variant === "both" ? 6 : 3
): Exercise[] {
  let words: (WordEntry & { hardness: Hardness })[] = [];
  if (variant === "hard" || variant === "both") {
    words = words.concat((hardWords ?? []).map((w) => ({ ...w, hardness: "hard" as const })));
  }
  if (variant === "soft" || variant === "both") {
    words = words.concat((softWords ?? []).map((w) => ({ ...w, hardness: "soft" as const })));
  }
  words = shuffle(words).slice(0, wordLimit);

  const queue: Exercise[] = [];
  for (const w of words) {
    queue.push({ type: "insert", ...w });
    queue.push({ type: "guess", ...w });
    if (variant === "both") queue.push({ type: "classify", ...w });
  }
  return queue;
}

/** Буква, которую нужно вставить в слово (верхний регистр). */
export function targetLetter(word: string, idx: number): string {
  return word[idx].toUpperCase();
}

/** 4 варианта букв для режима "вставь звук": целевая буква + 3 случайные. */
export function buildLetterOptions(word: string, idx: number): string[] {
  const target = targetLetter(word, idx);
  const pool = shuffle(ALL_LETTERS.filter((l) => l !== target)).slice(0, 3);
  return shuffle([target, ...pool]);
}

/** Слово с открытыми первой и последней буквами, остальное скрыто ("Р_б_"). */
export function maskWord(word: string): string {
  return word
    .split("")
    .map((ch, i, arr) => (i === 0 || i === arr.length - 1 ? ch.toUpperCase() : "_"))
    .join("");
}

/** 2 слова-обманки похожей длины для режима "угадай слово". */
export function pickDistractorWords(word: string, bank: string[] = ALL_WORDS_FLAT): string[] {
  const similar = shuffle(bank.filter((w) => w !== word && Math.abs(w.length - word.length) <= 1));
  return similar.slice(0, 2);
}

/** 3 варианта слов для режима "угадай слово": верное + 2 обманки, перемешанные. */
export function buildWordOptions(word: string, bank: string[] = ALL_WORDS_FLAT): string[] {
  return shuffle([word, ...pickDistractorWords(word, bank)]);
}
