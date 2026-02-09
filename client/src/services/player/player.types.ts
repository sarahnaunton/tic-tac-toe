export interface Player {
  id: string,
  username: string,
}

export interface CreatePlayer {
  username: string,
}

export interface PlayerWithStats  {
  id: string,
  username: string,
  wins: number,
  draws: number,
  losses: number,
}

