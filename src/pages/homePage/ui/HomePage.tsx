import { GameBoard } from '@/widgets/gameBoard'
import { GameScore } from '@/widgets/gameScore'
import React from 'react'

export const HomePage: React.FC = () => {
  return (
    <div>
      <GameScore />
      <GameBoard />
    </div>
  )
}
