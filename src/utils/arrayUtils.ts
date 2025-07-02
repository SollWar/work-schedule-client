export function getFiveElements(
  arr: string[],
  n: number
): ({ val: string; index: number } | null)[] {
  const result: ({ val: string; index: number } | null)[] = []

  result.push({ val: arr[n] ?? null, index: n })

  for (let i = 1; i <= 3; i++) {
    const index = n + i
    result.push(
      index < arr.length ? { val: arr[index] ?? null, index: index } : null
    )
  }

  return result
}
