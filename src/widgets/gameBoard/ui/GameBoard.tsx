import React from 'react'
import { ColorChange, setPlayerMenuOpen, setEnemyMenuOpen } from '@/features/colorChange'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { increaseEnemyScore, increasePlayerScore, setIsGameStarted } from '../model/gameBoardSlice'
import { GameBoardProps } from '../model/types'
import { Hero } from '../model/Hero'

import './GameBoard.scss'

export const GameBoard: React.FC<GameBoardProps> = ({ isGameStarted, playerSettings, enemySettings, canvasWidth, canvasHeight }) => {
  const dispatch = useAppDispatch()
  const isPlayerMenuOpen = useAppSelector((state) => state.heroColor.playerMenuOpen)
  const isEnemyMenuOpen = useAppSelector((state) => state.heroColor.enemyMenuOpen)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const animationIDRef = React.useRef<number>(0)
  const [mouseClickCoords, setMouseClickCoords] = React.useState<{
    x: number
    y: number
  }>({
    x: 0,
    y: 0,
  })
  const pixelRatio = window.devicePixelRatio || 1
  const width = pixelRatio * canvasWidth
  const height = pixelRatio * canvasHeight
  const heroRadius = canvasWidth > 800 ? 40 * pixelRatio : 20 * pixelRatio

  const handleGameStart = () => {
    dispatch(setIsGameStarted(true))
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const rect = canvas?.getBoundingClientRect()
    const playerPosition = { x: 0, y: 0 }
    const enemyPosition = { x: 0, y: 0 }
    if (width && height) {
      const maxY = height - heroRadius - 10 * pixelRatio
      const minY = heroRadius + 10 * pixelRatio
      playerPosition.y = Math.floor(Math.random() * maxY) + minY
      playerPosition.x = heroRadius + 10 * pixelRatio
      enemyPosition.y = Math.floor(Math.random() * maxY) + minY
      enemyPosition.x = width - heroRadius - 10 * pixelRatio
      console.log(playerPosition, enemyPosition)
    }

    const player = new Hero(playerPosition, playerSettings, 10, heroRadius)
    const enemy = new Hero(enemyPosition, enemySettings, -10, heroRadius)

    canvas?.addEventListener('mousemove', (e) => {
      e.preventDefault()
      if (rect) {
        const x = (e.clientX - rect.left) * pixelRatio
        const y = (e.clientY - rect.top) * pixelRatio
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
          if (distance < heroRadius + projectile.radius) {
            player.projectiles.splice(i, 1)
            dispatch(increasePlayerScore())
          }

          if (projectile.position.x > width) {
            player.projectiles.splice(i, 1)
          }
        }

        for (let i = enemy.projectiles.length - 1; i >= 0; i--) {
          const projectile = enemy.projectiles[i]
          projectile.update(ctx)
          const xDiff = player.position.x - projectile.position.x
          const yDiff = player.position.y - projectile.position.y
          const distance = Math.hypot(xDiff, yDiff)
          if (distance < heroRadius + projectile.radius) {
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
    const x = (event.clientX - rect.left) * pixelRatio
    const y = (event.clientY - rect.top) * pixelRatio
    setMouseClickCoords({ x, y })
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    const player = new Hero({ x: heroRadius + 10, y: height / 2 }, playerSettings, 10, heroRadius)
    const enemy = new Hero({ x: width - heroRadius - 10, y: height / 2 }, enemySettings, -10, heroRadius)

    player.mouseClickPosition = mouseClickCoords
    enemy.mouseClickPosition = mouseClickCoords

    if (ctx) {
      player.draw(ctx)
      enemy.draw(ctx)
    }
    if (player.click() && !isGameStarted) {
      dispatch(setPlayerMenuOpen())
      setMouseClickCoords({ x: 0, y: 0 })
    }
    if (enemy.click() && !isGameStarted) {
      dispatch(setEnemyMenuOpen())
      setMouseClickCoords({ x: 0, y: 0 })
    }
  }, [mouseClickCoords, isGameStarted, playerSettings, enemySettings, dispatch, heroRadius, width, height])

  return (
    <div className='game-container'>
      <canvas
        width={width}
        height={height}
        ref={canvasRef}
        className='game-board__canvas'
        style={{ width: canvasWidth, height: canvasHeight }}
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
