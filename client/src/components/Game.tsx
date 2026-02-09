import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Board } from './Board'
import { Cell, Grid, XorO } from '../types'
import { getWinner } from '../utils/getWinner'
import { Game as GameType } from '../services/game/game.types'
import { Player } from '../services/player/player.types'
import { createMove } from '../services/move/move.service'
import { abandonGame, completeGame } from '../services/game/game.service'

const createBoard = (size: number): Grid =>
  Array.from({ length: size }, () => Array.from({ length: size }, (): Cell => undefined))

type TurnPlayer = {
  playerId: string,
  username: string,
  symbol: XorO
}

export const Game: FunctionComponent<{
  createdGame: GameType,
  players: Player[],
  onAbandon: () => void,
  onGameComplete: () => void,
}> = ({ createdGame, players, onAbandon, onGameComplete }) => {
  const [board, setBoard] = useState<Grid>(() => createBoard(createdGame.boardSize))
  const turnPlayers: TurnPlayer[] = createdGame.gamePlayers
    .map(gp => {
      const player = players.find(p => p.id === gp.playerId)
      if (!player) return null
      return {
        playerId: gp.playerId,
        username: player.username,
        symbol: gp.symbol,
      }
    })
    .filter((tp): tp is TurnPlayer => tp !== null)

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0)
  const currentPlayer = turnPlayers[currentPlayerIndex]
  const moveNumberRef = useRef(1)

  const winner = getWinner(board)
  const isWinner = winner !== null
  const isBoardFull = board.every((row) => row.every((cell) => cell !== undefined))
  const isDraw = !isWinner && isBoardFull
  const isGameFinished = isWinner || isDraw

  useEffect(() => {
    if (!isGameFinished) return
    const run = async () => {
      try {
        const winnerPlayer = turnPlayers.find((p) => p.symbol === winner)
        if (isWinner && winnerPlayer) {
          await completeGame(createdGame.id, 'WIN', winnerPlayer.playerId)
        } else if (isDraw) {
          await completeGame(createdGame.id, 'DRAW')
        }
        onGameComplete()
      } catch (error) {
        console.error('Error completing game', error)
      }
    }
    run()
  }, [isWinner, isDraw])

  const handleSquareClick = async (rowIndex: number, colIndex: number) => {
    if (isWinner || isDraw) return
    if (!currentPlayer) return
    if (board[rowIndex][colIndex] !== undefined) return

    const move = {
      gameId: createdGame.id,
      playerId: currentPlayer.playerId,
      positionRow: rowIndex,
      positionColumn: colIndex,
      moveNumber: moveNumberRef.current
    }
    try {
      await createMove(move)
    } catch (error) {
      console.error('Error creating move', error)
    }
  

    const newBoard = board.map((row, r) =>
      row.map((cell, c) => (r === rowIndex && c === colIndex ? currentPlayer.symbol : cell))
    )
    setBoard(newBoard)
    moveNumberRef.current += 1
    setCurrentPlayerIndex((prev) => (prev + 1) % turnPlayers.length)
  }

  const handleRestartGame = async () => {
    try {
      if (!isGameFinished) {
        await abandonGame(createdGame.id)
      }
      onAbandon()
    } catch (error) {
      console.error('Error abandoning game', error)
    }
  }

  return (
    <div className='flex flex-col gap-1'>
      {!isGameFinished && currentPlayer && (
        <div className='font-bold'>
          Next Player: {currentPlayer.username} (Symbol: {currentPlayer.symbol})
        </div>
      )}
      {isWinner && <div className='font-bold'>Player {winner} has won!</div>}
      {isDraw && <div className='font-bold'>It was a draw</div>}
      <Board board={board} onSquareClick={handleSquareClick} />
      <button
        type='button'
        onClick={handleRestartGame}
        className='mt-2 font-bold border-2 border-gray-900 px-4 py-2 cursor-pointer'
      >
        Restart Game
      </button>
    </div>
  )
}
