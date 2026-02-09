import React, { FunctionComponent, useState } from 'react'
import { getPlayers, createPlayer } from '../services/player/player.service'
import type { Player } from '../services/player/player.types'
import { getErrorMessage } from '../utils/getErrorMessage'

export const UserInput: FunctionComponent<{
  playerNumber: number, 
  onPlayerChosen: (player: Player) => void
}> = ({ playerNumber, onPlayerChosen }) => {
  const [username, setUsername] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleAddPlayer = async () => {
    if (!username) return
    setErrorMessage(null)
    try {
      const players = await getPlayers(`username=${encodeURIComponent(username)}`)
      if (players.length > 0) {
        onPlayerChosen(players[0])
      } else {
        const player = await createPlayer({ username })
        onPlayerChosen(player)
      }
      setErrorMessage(null)
      setUsername('')
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
      console.error('Error adding player', error)
    }
  }

  return (
    <div className='flex flex-col gap-3 border border-gray-300 p-4 rounded w-full'>
      <h2 className='font-bold'>Player {playerNumber}</h2>
      <div className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border-2 border-gray-900 px-2 py-1 w-40'
        />
        <button
          type='button'
          onClick={handleAddPlayer}
          className='font-bold border-2 border-gray-900 px-3 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Continue
        </button>
      </div>
      {errorMessage && (
        <p className='text-red-600 text-sm' role='alert'>{errorMessage}</p>
      )}
    </div>
  )
}

