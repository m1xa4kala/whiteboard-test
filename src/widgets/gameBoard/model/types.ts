export enum PlayerColor {
  orange = '#ff5531',
  red = '#ff1c1c',
  blue = '#1c61ff',
  green = '#1fea1f',
  purple = '#cd1ecd',
}

export type Settings = {
  color: PlayerColor
  speed: number
  spellColor: PlayerColor
  fireRate: number
}

export type GameBoardProps = {
  width?: number
  height?: number
  playerSettings: Settings
  enemySettings: Settings
}
