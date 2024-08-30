import React from 'react'
import { setTargetScore } from '@/features/gameOver'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

import './ChangeTargetScore.scss'

export const ChangeTargetScore: React.FC = () => {
  const dispatch = useAppDispatch()
  const targetScore = useAppSelector((state) => state.gameOver.targetScore)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTargetScore(+e.target.value))
  }
  return (
    <div className='change-target-score'>
      <h2>Set target score</h2>
      <input type='number' min={1} value={targetScore} onChange={(e) => handleChange(e)} />
    </div>
  )
}
