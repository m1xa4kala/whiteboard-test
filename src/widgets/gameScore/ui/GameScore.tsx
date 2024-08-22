import React from 'react'
import { useAppSelector } from '@/shared/lib'
import './GameScore.scss'

export const GameScore: React.FC = () => {
  const playerScore = useAppSelector((state) => state.gameScore.playerScore)
  const enemyScore = useAppSelector((state) => state.gameScore.enemyScore)

  return (
    <div className='game-score'>
      <div className='player-score'>
        <h3>Your score: </h3>
        <span>{playerScore}</span>
      </div>
      <div className='enemy-score'>
        <h3>Enemy score: </h3>
        <span>{enemyScore}</span>
      </div>
    </div>
  )
}
