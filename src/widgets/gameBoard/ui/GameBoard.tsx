import React from 'react'
import { ColorChange, setPlayerMenuOpen, setEnemyMenuOpen } from '@/features/colorChange'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { increaseEnemyScore, increasePlayerScore, setIsGameStarted } from '../model/gameBoardSlice'
import { GameBoardProps } from '../model/types'
import { Hero } from '../model/Hero'

import './GameBoard.scss'

export const GameBoard: React.FC<GameBoardProps> = ({ width = 600, height = 600, isGameStarted, playerSettings, enemySettings }) => {
  const dispatch = useAppDispatch()
  const isPlayerMenuOpen = useAppSelector((state) => state.heroColor.playerMenuOpen)
  const isEnemyMenuOpen = useAppSelector((state) => state.heroColor.enemyMenuOpen)
  const boardRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const animationIDRef = React.useRef<number>(0)
  const devicePixelRatio = window.devicePixelRatio || 1
  const [mouseClickCoords, setMouseClickCoords] = React.useState<{
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
    const rect = canvas?.getBoundingClientRect()

    const playerY = Math.random() * (height - 60) + 30
    const playerX = 40
    const enemyY = Math.random() * (height - 60) + 30
    const enemyX = width - 40

    const player = new Hero({ x: playerX, y: playerY }, playerSettings, 10)
    const enemy = new Hero({ x: enemyX, y: enemyY }, enemySettings, -10)

    canvas?.addEventListener('mousemove', (e) => {
      e.preventDefault()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        player.mousePosition = { x, y }
      }
    })

    const renderer = () => {
      animationIDRef.current = window.requestAnimationFrame(renderer)

      if (ctx) {
        ctx.clearRect(0, 0, width, height)
        player.update(ctx, height)
        enemy.update(ctx, height)

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
  }

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setMouseClickCoords({ x, y })
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
    if (player.click(mouseClickCoords.x, mouseClickCoords.y) && !isGameStarted) {
      dispatch(setPlayerMenuOpen())
    }
    if (enemy.click(mouseClickCoords.x, mouseClickCoords.y) && !isGameStarted) {
      dispatch(setEnemyMenuOpen())
    }
  }, [playerSettings, enemySettings, width, height, mouseClickCoords, isGameStarted, dispatch])
  return (
    <div className='game-board' ref={boardRef}>
      <canvas
        className='game-board__canvas'
        ref={canvasRef}
        width={width * devicePixelRatio}
        height={height * devicePixelRatio}
        onClick={isGameStarted ? () => null : (e) => handleClick(e)}
      />
      <div className='game-board__buttons'>
        <button onClick={handleGameStart} disabled={isGameStarted}>
          Start
        </button>
        <button onClick={() => window.location.reload()} disabled={!isGameStarted}>
          Restart
        </button>
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
