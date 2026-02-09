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