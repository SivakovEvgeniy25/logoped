// Данные логопедической игры: звуки сгруппированы по месту образования
// (переднеязычные / среднеязычные / заднеязычные) и по твёрдости/мягкости.
// Чтобы добавить новый звук или слово — просто расширьте объект GROUPS.

export type WordEntry = {
  word: string;
  pic: string; // эмодзи-картинка
  idx: number; // индекс буквы целевого звука в слове
};

export type Hardness = "hard" | "soft";

export type SoundEntry = {
  emoji: string;
  hard?: WordEntry[];
  soft?: WordEntry[];
};

export type SoundGroup = {
  key: GroupKey;
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
  accent: string;
  mascot: string;
  sounds: Record<string, SoundEntry>;
};

export type GroupKey = "front" | "mid" | "back";

export const GROUPS: Record<GroupKey, SoundGroup> = {
  front: {
    key: "front",
    title: "Остров Языка-Кончика",
    subtitle: "Переднеязычные звуки — кончик языка у зубов",
    gradientFrom: "#2d6a4f",
    gradientTo: "#123524",
    accent: "#ffd166",
    mascot: "🦔",
    sounds: {
      Р: {
        emoji: "🦊",
        hard: [
          { word: "рыба", pic: "🐟", idx: 0 },
          { word: "корова", pic: "🐄", idx: 2 },
          { word: "топор", pic: "🪓", idx: 4 },
        ],
        soft: [
          { word: "река", pic: "🏞️", idx: 0 },
          { word: "берёза", pic: "🌳", idx: 2 },
          { word: "варенье", pic: "🍯", idx: 2 },
        ],
      },
      Л: {
        emoji: "🐺",
        hard: [
          { word: "лампа", pic: "💡", idx: 0 },
          { word: "стол", pic: "🪑", idx: 3 },
          { word: "белка", pic: "🐿️", idx: 2 },
        ],
        soft: [
          { word: "лес", pic: "🌲", idx: 0 },
          { word: "апельсин", pic: "🍊", idx: 3 },
          { word: "мебель", pic: "🛋️", idx: 4 },
        ],
      },
      С: {
        emoji: "🐝",
        hard: [
          { word: "сумка", pic: "👜", idx: 0 },
          { word: "сова", pic: "🦉", idx: 0 },
          { word: "нос", pic: "👃", idx: 2 },
        ],
        soft: [
          { word: "сирень", pic: "🌸", idx: 0 },
          { word: "письмо", pic: "✉️", idx: 2 },
          { word: "гусеница", pic: "🐛", idx: 3 },
        ],
      },
      З: {
        emoji: "🦓",
        hard: [
          { word: "зонт", pic: "☂️", idx: 0 },
          { word: "коза", pic: "🐐", idx: 2 },
          { word: "ваза", pic: "🏺", idx: 2 },
        ],
        soft: [
          { word: "зима", pic: "❄️", idx: 0 },
          { word: "земляника", pic: "🍓", idx: 0 },
          { word: "обезьяна", pic: "🐒", idx: 3 },
        ],
      },
      Ш: { emoji: "🐍", hard: [
        { word: "шапка", pic: "🧢", idx: 0 },
        { word: "кошка", pic: "🐱", idx: 2 },
        { word: "мышь", pic: "🐭", idx: 2 },
      ] },
      Ж: { emoji: "🪲", hard: [
        { word: "жук", pic: "🪲", idx: 0 },
        { word: "ёжик", pic: "🦔", idx: 1 },
        { word: "лыжи", pic: "⛷️", idx: 2 },
      ] },
      Ц: { emoji: "🐤", hard: [
        { word: "цветок", pic: "🌸", idx: 0 },
        { word: "огурец", pic: "🥒", idx: 4 },
        { word: "яйцо", pic: "🥚", idx: 2 },
      ] },
      Ч: { emoji: "🦋", soft: [
        { word: "чашка", pic: "☕", idx: 0 },
        { word: "бабочка", pic: "🦋", idx: 4 },
        { word: "ключ", pic: "🔑", idx: 3 },
      ] },
      Щ: { emoji: "🐶", soft: [
        { word: "щенок", pic: "🐶", idx: 0 },
        { word: "ящик", pic: "📦", idx: 2 },
        { word: "плащ", pic: "🧥", idx: 3 },
      ] },
    },
  },
  mid: {
    key: "mid",
    title: "Островок Средний",
    subtitle: "Среднеязычный звук — средняя часть языка у нёба",
    gradientFrom: "#5e548e",
    gradientTo: "#231942",
    accent: "#9de0ff",
    mascot: "🐦",
    sounds: {
      Й: { emoji: "🐦", soft: [
        { word: "йогурт", pic: "🥣", idx: 0 },
        { word: "чайка", pic: "🐦", idx: 2 },
        { word: "майка", pic: "👕", idx: 2 },
      ] },
    },
  },
  back: {
    key: "back",
    title: "Горы Заднего Языка",
    subtitle: "Заднеязычные звуки — задняя часть языка у нёба",
    gradientFrom: "#bb6a2e",
    gradientTo: "#5f3113",
    accent: "#ffe08a",
    mascot: "🐐",
    sounds: {
      К: {
        emoji: "🐱",
        hard: [
          { word: "кот", pic: "🐱", idx: 0 },
          { word: "рука", pic: "✋", idx: 2 },
          { word: "молоко", pic: "🥛", idx: 3 },
        ],
        soft: [
          { word: "кит", pic: "🐳", idx: 0 },
          { word: "кенгуру", pic: "🦘", idx: 0 },
          { word: "носки", pic: "🧦", idx: 3 },
        ],
      },
      Г: {
        emoji: "🐐",
        hard: [
          { word: "гора", pic: "⛰️", idx: 0 },
          { word: "нога", pic: "🦵", idx: 2 },
          { word: "радуга", pic: "🌈", idx: 4 },
        ],
        soft: [
          { word: "гитара", pic: "🎸", idx: 0 },
          { word: "гиря", pic: "🏋️", idx: 0 },
          { word: "сапоги", pic: "👢", idx: 4 },
        ],
      },
      Х: {
        emoji: "🐓",
        hard: [
          { word: "хлеб", pic: "🍞", idx: 0 },
          { word: "муха", pic: "🪰", idx: 2 },
          { word: "петух", pic: "🐓", idx: 4 },
        ],
        soft: [
          { word: "духи", pic: "🧴", idx: 2 },
          { word: "орехи", pic: "🌰", idx: 3 },
          { word: "мухи", pic: "🪰", idx: 2 },
        ],
      },
    },
  },
};

export const ALL_LETTERS = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ".split("");

export const ALL_WORDS_FLAT: string[] = Object.values(GROUPS).flatMap((g) =>
  Object.values(g.sounds).flatMap((s) => [...(s.hard ?? []), ...(s.soft ?? [])].map((w) => w.word))
);

export function hasHard(sound: SoundEntry): boolean {
  return !!sound.hard && sound.hard.length > 0;
}
export function hasSoft(sound: SoundEntry): boolean {
  return !!sound.soft && sound.soft.length > 0;
}
