import React, { FunctionComponent, useState } from 'react'
import { NUMBER_OF_PLAYERS } from '../constants'
import type { Player } from '../services/player/player.types'
import { UserInput } from './UserInput'

export const Users:FunctionComponent<{onDone: (players: Player[]) => void}> = ({ onDone }) => {
  const [players, setPlayers] = useState<Player[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handlePlayerChosen = (player: Player) => {
    const isDuplicate = players.some((p) => p.id === player.id)
    if (isDuplicate) {
      setError('That player is already selected. Please choose a different username.')
      return
    }

    setError(null)
    const updatedPlayers = [...players, player]
    setPlayers(updatedPlayers)

    if (updatedPlayers.length === NUMBER_OF_PLAYERS) {
      onDone(updatedPlayers)
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  return (
    <div className='w-full max-w-md'>
      <UserInput playerNumber={currentIndex + 1} onPlayerChosen={handlePlayerChosen} />
      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
    </div>
  )
}
