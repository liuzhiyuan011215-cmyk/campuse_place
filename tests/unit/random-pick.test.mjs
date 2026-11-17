import assert from "node:assert/strict";
import { test } from "node:test";
import { pickRandomPlace } from "../../src/lib/randomPick.ts";

const items = [
  { id: "a", isFood: true },
  { id: "b", isFood: true },
  { id: "c", isFood: false },
];

test("pickRandomPlace: 분류 미선택 시 식당·카페(isFood)에서 우선 뽑는다", () => {
  const picked = pickRandomPlace(items, "", undefined, () => 0.99);
  assert.equal(picked?.id, "b");
  assert.equal(pickRandomPlace([items[2]], "", undefined, () => 0)?.id, "c");
});

test("pickRandomPlace: 다시 뽑기 시 직전 항목은 제외하고, 비어 있으면 null", () => {
  assert.equal(pickRandomPlace(items, "", "b", () => 0)?.id, "a");
  assert.equal(pickRandomPlace(items, "자유", "a", () => 0.99)?.id, "c");
  assert.equal(pickRandomPlace([items[0]], "", "a", () => 0)?.id, "a");
  assert.equal(pickRandomPlace([], "", undefined), null);
});
