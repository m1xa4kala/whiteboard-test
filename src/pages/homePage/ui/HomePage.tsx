import React from 'react'
import { GameBoard } from '@/widgets/gameBoard'
import { GameScore } from '@/widgets/gameScore'
import { PlayerColor } from '@/widgets/gameBoard'

export const HomePage: React.FC = () => {
  return (
    <div>
      <GameScore />
      <GameBoard
        width={600}
        height={600}
        playerSettings={{
          color: PlayerColor.blue,
          speed: 5,
          spellColor: PlayerColor.orange,
          fireRate: 0.8,
          spellSpeed: 4,
          projectiles: [],
        }}
        enemySettings={{ color: PlayerColor.red, speed: 5, spellColor: PlayerColor.purple, fireRate: 0.2, spellSpeed: -4, projectiles: [] }}
      />
    </div>
  )
}
