import { Grid, XorO } from '../types'

type Position = [number, number]

const getWinningLines = (size: number): Position[][] => {
  const lines: Position[][] = []

  // Row winning lines
  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    lines.push(
      Array.from({ length: size }, (_value, colIndex): Position => [rowIndex, colIndex])
    )
  }

  // Column winning lines
  for (let colIndex = 0; colIndex < size; colIndex++) {
    lines.push(
      Array.from({ length: size }, (_value, rowIndex): Position => [rowIndex, colIndex])
    )
  }

  // Diagonal top-left to bottom-right winning line e.g. 00, 11, 22
  lines.push(
    Array.from({ length: size }, (_value, n): Position => [n, n])
  )

  // Diagonal top-right to bottom-left winning line e.g. 0(last column)
  lines.push(
    Array.from({ length: size }, (_value, n): Position => [n, size - 1 - n])
  )

  return lines
}


export const getWinner = (board: Grid): XorO | null => {
  const winningLines = getWinningLines(board.length)
  for (const line of winningLines) {
    const values = line.map(([row, col]) => board[row][col])
    const first = values[0]
    if (first !== undefined && values.every((value) => value === first)) return first
  }
  return null
}



// --- Original winning lines (3x3 only) ---
// const winningLines: [number, number][][] = [
//   // Rows: 123, 456, 789
//   [[0, 0], [0, 1], [0, 2]],
//   [[1, 0], [1, 1], [1, 2]],
//   [[2, 0], [2, 1], [2, 2]],
//   // Columns: 147, 258, 369
//   [[0, 0], [1, 0], [2, 0]],
//   [[0, 1], [1, 1], [2, 1]],
//   [[0, 2], [1, 2], [2, 2]],
//   // Diagonals: 159, 357
//   [[0, 0], [1, 1], [2, 2]],
//   [[0, 2], [1, 1], [2, 0]]
// ]

// --- Original getWinner (3x3 only) ---
// export const getWinner = (board: Grid): XorO | null => {
//   for (const [[r0, c0], [r1, c1], [r2, c2]] of winningLines) {
//     const a = board[r0][c0]
//     const b = board[r1][c1]
//     const c = board[r2][c2]
//     if (a !== undefined && a === b && b === c) return a
//   }
//   return null
// }
