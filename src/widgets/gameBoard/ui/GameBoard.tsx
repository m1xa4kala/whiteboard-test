import React from 'react'
import { GameBoardProps } from '../model/types'
import { drawHero } from '../model/drawHero'

import './GameBoard.scss'

export const GameBoard: React.FC<GameBoardProps> = ({ width = 600, height = 600, playerSettings, enemySettings }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const handleClick = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    let animationID = 0
    let playerY = Math.random() * (height - 60) + 30
    let playerSpeed = playerSettings.speed
    let enemyY = Math.random() * (height - 60) + 30
    let enemySpeed = enemySettings.speed
    const renderer = () => {
      animationID = window.requestAnimationFrame(renderer)
      if (ctx) {
        ctx.clearRect(0, 0, width, height)
        drawHero(ctx, playerSettings, 40, playerY)
        drawHero(ctx, enemySettings, width - 40, enemyY)
      }
      if (playerY + 30 > height || playerY - 30 < 0) {
        playerSpeed = -playerSpeed
      }
      if (enemyY + 30 > height || enemyY - 30 < 0) {
        enemySpeed = -enemySpeed
      }
      playerY += playerSpeed
      enemyY += enemySpeed
    }
    renderer()
    return animationID
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (ctx) {
      drawHero(ctx, playerSettings, 40, height / 2)
      drawHero(ctx, enemySettings, width - 40, height / 2)
    }
  }, [playerSettings, enemySettings, width, height])
  return (
    <div>
      <button onClick={handleClick}>Start</button>
      <button onClick={() => window.location.reload()}>Reset</button>
      <canvas className='game-board' ref={canvasRef} width={width} height={height} />
    </div>
  )
}
