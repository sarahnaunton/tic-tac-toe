import React, { FunctionComponent, useEffect, useState } from 'react'
import type { Player } from '../services/player/player.types'
import type { PlayerWithStats } from '../services/player/player.types'
import { getPlayer } from '../services/player/player.service'

export const Statistics: FunctionComponent<{ players: Player[] }> = ({ players }) => {
  const [playersWithStats, setPlayersWithStats] = useState<PlayerWithStats[]>([])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const results = await Promise.all(
        players.map((player) => getPlayer(player.id, true) as Promise<PlayerWithStats>)
      )
      if (!cancelled) setPlayersWithStats(results)
    }
    run()
    return () => { cancelled = true }
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
    </section>
  )
}
