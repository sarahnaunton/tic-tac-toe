export interface Player {
  id: string,
  username: string,
}

export type CreatePlayer = Omit<Player, 'id'>

export interface PlayerWithStats  {
  id: string,
  username: string,
  wins: number,
  draws: number,
  losses: number,
}

