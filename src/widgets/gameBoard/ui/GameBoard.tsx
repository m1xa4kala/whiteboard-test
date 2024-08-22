import React from 'react'
import { GameBoardProps } from '../model/types'
import { drawHero } from '../model/drawHero'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { setIsGameStarted } from '../model/gameBoardSlice'
import './GameBoard.scss'

export const GameBoard: React.FC<GameBoardProps> = ({ width = 600, height = 600, playerSettings, enemySettings }) => {
  const dispatch = useAppDispatch()
  const isGameStarted = useAppSelector((state) => state.gameBoard.isGameStarted)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const handleClick = () => {
    dispatch(setIsGameStarted(true))
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    let playerY = Math.random() * (height - 60) + 30
    const playerX = 40
    let playerSpeed = playerSettings.speed
    let enemyY = Math.random() * (height - 60) + 30
    const enemyX = width - 40
    let enemySpeed = enemySettings.speed
    let playerSpellSize = 6
    let enemySpellSize = 6
    let playerSpellIncrease = playerSettings.fireRate
    let enemySpellIncrease = enemySettings.fireRate

    let animationID = 0
    const renderer = () => {
      animationID = window.requestAnimationFrame(renderer)

      if (ctx) {
        ctx.clearRect(0, 0, width, height)
        drawHero(ctx, playerSettings, playerX, playerY, playerSpellSize)
        drawHero(ctx, enemySettings, enemyX, enemyY, enemySpellSize)

        if (playerY + 30 > height || playerY - 30 < 0) {
          playerSpeed = -playerSpeed
        }
        if (enemyY + 30 > height || enemyY - 30 < 0) {
          enemySpeed = -enemySpeed
        }
        playerY += playerSpeed
        enemyY += enemySpeed

        if (playerSpellSize >= 12 || playerSpellSize <= 4) {
          playerSpellIncrease = -playerSpellIncrease
        }

        if (enemySpellSize >= 12 || enemySpellSize <= 4) {
          enemySpellIncrease = -enemySpellIncrease
        }

        if (playerSpellSize <= 4) {
          console.log('PlayerShoot')
          playerSettings.projectiles.push({ x: playerX, y: playerY })
        }
        if (enemySpellSize <= 4) {
          console.log('EnemyShoot')
          enemySettings.projectiles.push({ x: enemyX, y: enemyY })
        }

        playerSpellSize += playerSpellIncrease
        enemySpellSize += enemySpellIncrease
        playerSettings.projectiles.forEach((projectile) => {
          projectile.x += playerSettings.spellSpeed
        })

        enemySettings.projectiles.forEach((projectile) => {
          projectile.x += enemySettings.spellSpeed
        })
      }
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
      <button onClick={handleClick} disabled={isGameStarted}>
        Start
      </button>
      <button onClick={() => window.location.reload()}>Reset</button>
      <canvas className='game-board' ref={canvasRef} width={width} height={height} />
    </div>
  )
}
