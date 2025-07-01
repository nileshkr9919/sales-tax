/**
 * Rounds a value up to the nearest 0.05.
 * @param value - The value to round.
 * @returns The rounded value.
 */
export function roundUpToNearest005(value: number): number {
  return Math.ceil(value * 20) / 20;
}
