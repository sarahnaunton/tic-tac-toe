import httpClient from '../httpClient'
import { CreatePlayer, Player } from './player.types'

export async function getPlayers(queryParam?: string): Promise<Player[]> {
  const { data } = await httpClient.get<Player[]>(`/api/players${queryParam ? `?${queryParam}` : ''}`)
  return data
}

export async function createPlayer(player: CreatePlayer): Promise<Player> {
  const { data } = await httpClient.post<Player>('/api/players', player)
  return data
}
