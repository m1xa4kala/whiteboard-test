export enum Color {
  orange = '#ff5531',
  red = '#ff1c1c',
  blue = '#1c61ff',
  green = '#1fea1f',
  purple = '#cd1ecd',
}

export type heroSettings = {
  color: string
  velocity: number
  fireRate: number
  spellColor: Color
}

export type GameBoardProps = {
  width?: number
  height?: number
  playerSettings: heroSettings
  enemySettings: heroSettings
}

export type GameBoardState = {
  isGameStarted: boolean
  playerScore: number
  enemyScore: number
  playerColor: heroSettings['color']
  enemyColor: heroSettings['color']
}
