import {
  shuffle,
  buildRoundQueue,
  targetLetter,
  buildLetterOptions,
  maskWord,
  pickDistractorWords,
  buildWordOptions,
} from "../gameLogic";
import { GROUPS } from "../soundData";

describe("shuffle", () => {
  it("returns an array with the same elements", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result).toHaveLength(input.length);
    expect([...result].sort()).toEqual([...input].sort());
  });

  it("does not mutate the original array", () => {
    const input = [1, 2, 3];
    shuffle(input);
    expect(input).toEqual([1, 2, 3]);
  });
});

describe("targetLetter", () => {
  it("returns the uppercase letter at the given index", () => {
    expect(targetLetter("рыба", 0)).toBe("Р");
    expect(targetLetter("корова", 2)).toBe("Р");
  });
});

describe("buildLetterOptions", () => {
  it("always includes the correct target letter", () => {
    const options = buildLetterOptions("рыба", 0);
    expect(options).toContain("Р");
  });

  it("returns exactly 4 unique options", () => {
    const options = buildLetterOptions("рыба", 0);
    expect(options).toHaveLength(4);
    expect(new Set(options).size).toBe(4);
  });
});

describe("maskWord", () => {
  it("keeps first and last letter, hides the middle", () => {
    expect(maskWord("рыба")).toBe("Р__А");
    expect(maskWord("кот")).toBe("К_Т");
  });

  it("handles very short words without crashing", () => {
    expect(maskWord("ус")).toBe("УС");
  });
});

describe("pickDistractorWords / buildWordOptions", () => {
  const bank = ["рыба", "лиса", "зима", "кот", "нос"];

  it("never includes the target word among distractors", () => {
    const distractors = pickDistractorWords("рыба", bank);
    expect(distractors).not.toContain("рыба");
  });

  it("returns at most 2 distractors", () => {
    const distractors = pickDistractorWords("рыба", bank);
    expect(distractors.length).toBeLessThanOrEqual(2);
  });

  it("buildWordOptions always includes the correct word", () => {
    const options = buildWordOptions("рыба", bank);
    expect(options).toContain("рыба");
  });
});

describe("buildRoundQueue", () => {
  const hard = GROUPS.front.sounds["Р"].hard!;
  const soft = GROUPS.front.sounds["Р"].soft!;

  it("builds insert+guess pairs for a single variant (no classify)", () => {
    const queue = buildRoundQueue(hard, soft, "hard");
    expect(queue.every((ex) => ex.type !== "classify")).toBe(true);
    // 2 упражнения (insert+guess) на каждое из макс. 3 слов
    expect(queue.length).toBe(Math.min(hard.length, 3) * 2);
  });

  it("adds a classify step for each word when variant is 'both'", () => {
    const queue = buildRoundQueue(hard, soft, "both");
    const classifyCount = queue.filter((ex) => ex.type === "classify").length;
    const wordCount = Math.min(hard.length + soft.length, 6);
    expect(classifyCount).toBe(wordCount);
    expect(queue.length).toBe(wordCount * 3);
  });

  it("respects the hardness of each word in 'both' mode", () => {
    const queue = buildRoundQueue(hard, soft, "both");
    const hardWordSet = new Set(hard.map((w) => w.word));
    queue.forEach((ex) => {
      if (hardWordSet.has(ex.word)) {
        expect(ex.hardness).toBe("hard");
      }
    });
  });
});
