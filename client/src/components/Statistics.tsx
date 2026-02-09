import React, { FunctionComponent, useEffect, useState } from 'react'
import type { Player } from '../services/player/player.types'
import type { PlayerWithStats } from '../services/player/player.types'
import { getPlayer } from '../services/player/player.service'
import { getErrorMessage } from '../utils/getErrorMessage'

export const Statistics: FunctionComponent<{ players: Player[] }> = ({ players }) => {
  const [playersWithStats, setPlayersWithStats] = useState<PlayerWithStats[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      setErrorMessage(null)
      try {
        const results = await Promise.all(
          players.map((player) => getPlayer(player.id, true) as Promise<PlayerWithStats>)
        )
        setPlayersWithStats(results)
      } catch (error) {
        setErrorMessage(getErrorMessage(error))
        console.error('Error loading stats', error)
      }
    }
    run()
  }, [players])

  return (
    <section className="mt-6 p-4 border-2 border-gray-300 rounded w-full max-w-md">
      <h2 className="font-bold text-lg mb-3">Stats</h2>
      <ul className="list-none flex flex-col gap-2">
        {playersWithStats.map((p) => (
          <li key={p.id} className="flex justify-between items-center">
            <span className="font-medium">{p.username}</span>
            <span className="text-gray-700">
              Wins: {p.wins} · Draws: {p.draws} · Losses: {p.losses}
            </span>
          </li>
        ))}
      </ul>
      {errorMessage && (
        <p className='text-red-600 text-sm mt-2' role='alert'>{errorMessage}</p>
      )}
    </section>
  )
}
