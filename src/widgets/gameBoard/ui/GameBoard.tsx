import React from 'react'
import { ColorChange, setPlayerMenuOpen, setEnemyMenuOpen } from '@/features/colorChange'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { increaseEnemyScore, increasePlayerScore, setIsGameStarted } from '../model/gameBoardSlice'
import { GameBoardProps } from '../model/types'
import { Hero } from '../model/Hero'

import './GameBoard.scss'

export const GameBoard: React.FC<GameBoardProps> = ({ width = 600, height = 600, playerSettings, enemySettings }) => {
  const dispatch = useAppDispatch()
  const isGameStarted = useAppSelector((state) => state.gameBoard.isGameStarted)
  const isPlayerMenuOpen = useAppSelector((state) => state.heroColor.playerMenuOpen)
  const isEnemyMenuOpen = useAppSelector((state) => state.heroColor.enemyMenuOpen)
  const boardRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [mouseCoords, setMouseCoords] = React.useState<{
    x: number
    y: number
  }>({
    x: 0,
    y: 0,
  })

  const handleGameStart = () => {
    dispatch(setIsGameStarted(true))
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    const playerY = Math.random() * (height - 60) + 30
    const playerX = 40
    const enemyY = Math.random() * (height - 60) + 30
    const enemyX = width - 40

    const player = new Hero({ x: playerX, y: playerY }, playerSettings, 10)
    const enemy = new Hero({ x: enemyX, y: enemyY }, enemySettings, -10)

    let animationID = 0
    const renderer = () => {
      animationID = window.requestAnimationFrame(renderer)

      if (ctx) {
        ctx.clearRect(0, 0, width, height)
        player.update(ctx, height)
        enemy.update(ctx, height)
        console.log(player.projectiles, enemy.projectiles)

        for (let i = player.projectiles.length - 1; i >= 0; i--) {
          const projectile = player.projectiles[i]
          projectile.update(ctx)
          const xDiff = enemy.position.x - projectile.position.x
          const yDiff = enemy.position.y - projectile.position.y
          const distance = Math.hypot(xDiff, yDiff)
          if (distance < 30 + projectile.radius) {
            player.projectiles.splice(i, 1)
            dispatch(increasePlayerScore())
          }

          if (projectile.position.x > height) {
            player.projectiles.splice(i, 1)
          }
        }

        for (let i = enemy.projectiles.length - 1; i >= 0; i--) {
          const projectile = enemy.projectiles[i]
          projectile.update(ctx)
          const xDiff = player.position.x - projectile.position.x
          const yDiff = player.position.y - projectile.position.y
          const distance = Math.hypot(xDiff, yDiff)
          if (distance < 30 + projectile.radius) {
            enemy.projectiles.splice(i, 1)
            dispatch(increaseEnemyScore())
          }

          if (projectile.position.x < 0) {
            enemy.projectiles.splice(i, 1)
          }
        }
      }
    }
    renderer()
    return animationID
  }

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setMouseCoords({ x, y })
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const player = new Hero({ x: 40, y: height / 2 }, playerSettings, 10)
    const enemy = new Hero({ x: width - 40, y: height / 2 }, enemySettings, -10)

    if (ctx) {
      player.draw(ctx)
      enemy.draw(ctx)
    }
    if (player.click(mouseCoords.x, mouseCoords.y) && !isGameStarted) {
      dispatch(setPlayerMenuOpen())
    }
    if (enemy.click(mouseCoords.x, mouseCoords.y) && !isGameStarted) {
      dispatch(setEnemyMenuOpen())
    }
  }, [playerSettings, enemySettings, width, height, mouseCoords, isGameStarted, dispatch])
  return (
    <div className='game-board' ref={boardRef}>
      <canvas className='game-board__canvas' ref={canvasRef} width={width} height={height} onClick={(e) => handleClick(e)} />
      <div className='game-board__buttons'>
        <button onClick={handleGameStart} disabled={isGameStarted}>
          Start
        </button>
        <button onClick={() => window.location.reload()}>Reset</button>
      </div>
      <div
        className='popup'
        style={{
          display: isGameStarted ? 'none' : 'block',
          position: 'absolute',
          top: height / 2,
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {isPlayerMenuOpen || isEnemyMenuOpen ? <ColorChange /> : null}
      </div>
    </div>
  )
}
