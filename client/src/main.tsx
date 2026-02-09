import React, { useState } from 'react'
import { Game } from './components/Game'
import { BoardSizeInput } from './components/BoardSizeInput'
import { NUMBER_OF_PLAYERS } from './constants'
import { Users } from './components/Users'
import type { Player } from './services/player/player.types'
import type { Game as GameType, PlayerSymbols } from './services/game/game.types'
import { createGame } from './services/game/game.service'

export const Main = () => {
  const [players, setPlayers] = useState<Player[] | null>(null)
  const [playerSymbols, setPlayerSymbols] = useState<PlayerSymbols[] | null>(null)
  const [createdGame, setCreatedGame] = useState<GameType | null>(null)

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
    try {
      const response = await createGame({ boardSize, playerSymbols })
      setCreatedGame(response)
    } catch (err) {
      console.error('Error creating game', err)
    }
  }

  const allPlayersChosen =
    players !== null && players.filter((p) => p !== undefined && p !== null).length === NUMBER_OF_PLAYERS

  return (
    <div className='flex flex-col mt-10 items-center gap-10'>
      <h1 className='font-bold text-2xl'>Tic Tac Toe</h1>
      {!allPlayersChosen && <Users onDone={handlePlayersDone} />}
      {allPlayersChosen && !createdGame && <BoardSizeInput onCreateGame={handleCreateGame} /> }
      {createdGame && <Game boardSize={createdGame.boardSize} />}
    </div>
  )
}
