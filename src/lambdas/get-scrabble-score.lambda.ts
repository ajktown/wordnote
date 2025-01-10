const points: Record<string, number> = {
  A: 1,
  E: 1,
  I: 1,
  L: 1,
  N: 1,
  O: 1,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10,
}
/**
 * getScrabbleScore calculates the scrabble score of a given word
 * It returns score as 0 (meaning invalid word) if:
 * - any character is not part of Record "points"
 * - word is empty
 * TODO: I believe this can be more detailed by returning the maximum score possible on board.
 */
export const getScrabbleScore = (word: string): number => {
  let score = 0
  for (const char of word.trim().toUpperCase().split(``)) {
    if (points[char] === undefined) return 0 // no longer a valid word for scrabble
    score += points[char]
  }
  return score
}
