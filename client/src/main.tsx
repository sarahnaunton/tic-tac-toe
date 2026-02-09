import React, { useState } from 'react'
import { Game } from './components/Game'
import { Statistics } from './components/Statistics'
import { BoardSizeInput } from './components/BoardSizeInput'
import { NUMBER_OF_PLAYERS } from './constants'
import { Users } from './components/Users'
import type { Player } from './services/player/player.types'
import type { Game as GameType, PlayerSymbols } from './services/game/game.types'
import { createGame } from './services/game/game.service'
import { getErrorMessage } from './utils/getErrorMessage'

export const Main = () => {
  const [players, setPlayers] = useState<Player[] | null>(null)
  const [playerSymbols, setPlayerSymbols] = useState<PlayerSymbols[] | null>(null)
  const [createdGame, setCreatedGame] = useState<GameType | null>(null)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const allPlayersChosen =
    players !== null && players.filter((p) => p !== undefined && p !== null).length === NUMBER_OF_PLAYERS

  const handlePlayersDone = (allPlayers: Player[]) => {
    setPlayers(allPlayers)
    const symbols: PlayerSymbols[] = allPlayers.map((player, index) => ({
      playerId: player.id,
      symbol: index === 0 ? 'X' : 'O'
    }))
    setPlayerSymbols(symbols)
  }

  const handleCreateGame = async (boardSize: number) => {
    if (!playerSymbols) return
    setErrorMessage(null)
    try {
      const response = await createGame({ boardSize, playerSymbols })
      setCreatedGame(response)
    } catch (err) {
      setErrorMessage(getErrorMessage(err))
      console.error('Error creating game', err)
    }
  }

  const handleAbandonGame = () => {
    setErrorMessage(null)
    setCreatedGame(null)
    setPlayers(null)
    setPlayerSymbols(null)
    setIsGameComplete(false)
  }

  const handleGameComplete = () => {
    setIsGameComplete(true)
  }

  return (
    <div className='flex flex-col mt-10 items-center gap-10 min-h-screen'>
      <h1 className='font-bold text-2xl'>Tic Tac Toe</h1>
      {!allPlayersChosen && <Users onDone={handlePlayersDone} />}
      {allPlayersChosen && !createdGame && <BoardSizeInput onCreateGame={handleCreateGame} />}
      {createdGame && players && (
        <>
          <Game
            createdGame={createdGame}
            players={players}
            onAbandon={handleAbandonGame}
            onGameComplete={handleGameComplete}
          />
          {isGameComplete && <Statistics players={players} />}
        </>
      )}
      {errorMessage && (
        <p className='text-red-600 text-sm' role='alert'>{errorMessage}</p>
      )}
    </div>
  )
}
