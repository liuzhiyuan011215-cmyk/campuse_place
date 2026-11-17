// 현재 필터 결과에서 무작위로 한 곳을 고른다.
// 분류를 고르지 않았을 때는 맛집·카페(isFood)가 있으면 그중에서 먼저 뽑는다.
export function pickRandomPlace<T extends { id: string; isFood: boolean }>(
  places: readonly T[],
  category: string,
  excludeId?: string,
  rand: () => number = Math.random,
): T | null {
  if (!places.length) return null;
  const foods = !category ? places.filter((p) => p.isFood) : [];
  const pool = foods.length > 0 ? foods : places;
  const candidates = excludeId && pool.length > 1 ? pool.filter((p) => p.id !== excludeId) : pool;
  return candidates[Math.floor(rand() * candidates.length)] ?? null;
}
