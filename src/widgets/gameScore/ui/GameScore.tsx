import React from 'react'
import { useAppSelector } from '@/shared/lib'
import './GameScore.scss'

export const GameScore: React.FC = () => {
  const playerScore = useAppSelector((state) => state.gameBoard.playerScore)
  const enemyScore = useAppSelector((state) => state.gameBoard.enemyScore)

  return (
    <div className='game-score'>
      <div className='player-score'>
        <h2>Your score: </h2>
        <span>{playerScore}</span>
      </div>
      <div className='enemy-score'>
        <h2>Enemy score: </h2>
        <span>{enemyScore}</span>
      </div>
    </div>
  )
}
