import React, { FunctionComponent, useState } from 'react'
import { Board } from '../board/board'
import { BoardSizeInput } from '../board/boardSizeInput'
import { MIN_BOARD_SIZE } from '../../constants'
import { Cell, Grid, XorO } from '../../types'
import { getWinner } from '../../utils/getWinner'

const createBoard = (size: number): Grid =>
  Array.from({ length: size }, () => Array.from({ length: size }, (): Cell => undefined))

export const Game: FunctionComponent<{}> = () => {
  const [boardSize, setBoardSize] = useState<number>(MIN_BOARD_SIZE)
  const [board, setBoard] = useState<Grid>(() => createBoard(MIN_BOARD_SIZE))
  const [currentPlayer, setCurrentPlayer] = useState<XorO>('X')
  const winner = getWinner(board)
  const isWinner = winner !== null
  const isBoardFull = board.every((row) => row.every((cell) => cell !== undefined))
  const isDraw = !isWinner && isBoardFull

  const handleBoardSizeChange = (size: number) => {
    setBoardSize(size)
    setBoard(createBoard(size))
    setCurrentPlayer('X')
  }

  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    if (isWinner || isDraw) return
    if (board[rowIndex][colIndex] !== undefined) return
    const newBoard = board.map((row, r) =>
      row.map((cell, c) => (r === rowIndex && c === colIndex ? currentPlayer : cell))
    )
    setBoard(newBoard)
    setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'))
  }

  const handleRestart = () => {
    setBoard(createBoard(boardSize))
    setCurrentPlayer('X')
  }

  return (
    <div className='flex flex-col gap-1'>
      <BoardSizeInput value={boardSize} onChange={handleBoardSizeChange} />
      {!isWinner && !isDraw && <div className='font-bold'>Next Player: {currentPlayer}</div>}
      {isWinner && <div className='font-bold'>Player {winner} has won!</div>}
      {isDraw && <div className='font-bold'>It was a draw</div>}
      <Board board={board} onSquareClick={handleSquareClick} />
      <button 
        type='button' 
        onClick={handleRestart} 
        className='mt-2 font-bold border-2 border-gray-900 px-4 py-2 cursor-pointer'>
        Restart Game
      </button>
    </div>
  )
}
