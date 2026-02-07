import { Grid, XorO } from '../types'

const winningLines: [number, number][][] = [
  // Rows: 123, 456, 789
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  // Columns: 147, 258, 369
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  // Diagonals: 159, 357
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
]

export const getWinner = (board: Grid): XorO | null => {
  for (const [[r0, c0], [r1, c1], [r2, c2]] of winningLines) {
    const firstCell = board[r0][c0]
    const secondCell = board[r1][c1]
    const thirdCell = board[r2][c2]
    if (firstCell !== undefined && firstCell === secondCell && secondCell === thirdCell) return firstCell
  }
  return null
}
