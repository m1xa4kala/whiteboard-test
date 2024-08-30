import React from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { setGameOver } from '../model/gameOverSlice'
import { Button } from '@/shared/ui'

import './GameOver.scss'

export const GameOver: React.FC = () => {
  const dispatch = useAppDispatch()
  const playerScore = useAppSelector((state) => state.gameBoard.playerScore)
  const enemyScore = useAppSelector((state) => state.gameBoard.enemyScore)
  const isGameOver = useAppSelector((state) => state.gameOver.isGameOver)
  const winner = useAppSelector((state) => state.gameOver.winner)
  const targetScore = useAppSelector((state) => state.gameOver.targetScore)
  React.useEffect(() => {
    if (playerScore === targetScore && targetScore !== 0) {
      dispatch(setGameOver({ isGameOver: true, winner: 'player' }))
    }
    if (enemyScore === targetScore && targetScore !== 0) {
      dispatch(setGameOver({ isGameOver: true, winner: 'enemy' }))
    }
  }, [dispatch, playerScore, enemyScore, targetScore])

  const congratulations = winner === 'player' ? 'YOU WIN' : 'YOU LOSE'
  return (
    <div className='game-over-wrapper' style={{ display: isGameOver ? 'flex' : 'none' }}>
      <h1>GAME OVER</h1>
      <h2>{congratulations}</h2>
      <Button onClick={() => window.location.reload()}>New game</Button>
    </div>
  )
}
