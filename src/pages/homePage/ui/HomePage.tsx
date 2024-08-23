import React from 'react'
import { GameBoard } from '@/widgets/gameBoard'
import { GameScore } from '@/widgets/gameScore'
import { Color } from '@/widgets/gameBoard'
import './HomePage.scss'

export const HomePage: React.FC = () => {
  return (
    <main className='home-page'>
      <GameScore />
      <GameBoard
        width={600}
        height={600}
        playerSettings={{
          color: Color.blue,
          velocity: 5,
          spellColor: Color.orange,
          fireRate: 1,
        }}
        enemySettings={{
          color: Color.red,
          velocity: 5,
          spellColor: Color.purple,
          fireRate: 1,
        }}
      />
    </main>
  )
}
