import React from 'react'
import { GameBoard } from '@/widgets/gameBoard'
import { GameScore } from '@/widgets/gameScore'
import { HeroSettings } from '@/features/heroSettings'
import { useAppSelector } from '@/shared/lib'
import './HomePage.scss'
import { useDebounce } from '@/shared/hooks'

export const HomePage: React.FC = () => {
  const isGameStarted = useAppSelector((store) => store.gameBoard.isGameStarted)
  const playerSpeed = useAppSelector((store) => store.heroSettings.playerSpeed)
  const playerFireRate = useAppSelector((store) => store.heroSettings.playerFireRate)
  const playerColor = useAppSelector((store) => store.heroColor.playerColor)
  const playerSpellColor = useAppSelector((store) => store.heroColor.playerSpellColor)
  const enemySpeed = useAppSelector((store) => store.heroSettings.enemySpeed)
  const enemyFireRate = useAppSelector((store) => store.heroSettings.enemyFireRate)
  const enemyColor = useAppSelector((store) => store.heroColor.enemyColor)
  const enemySpellColor = useAppSelector((store) => store.heroColor.enemySpellColor)

  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight

  const width = innerWidth > 800 ? (innerWidth / 100) * 50 : (innerWidth / 100) * 80
  const height = innerWidth > 800 ? innerHeight - 200 : innerHeight - 300

  const [containerSize, setContainerSize] = React.useState({
    height: height,
  })
  const [canvasSize, setCanvasSize] = React.useState({
    width: width,
    height: height,
  })

  const containerStyles: React.CSSProperties = {
    width: '100%',
    height: containerSize.height,
    gridTemplateColumns: innerWidth > 800 ? `1fr ${canvasSize.width}px 1fr` : `repeat(2, 1fr)`,
  }

  const resizeHandler = () => {
    if (innerWidth > 800) {
      setContainerSize({
        height: innerHeight - 200,
      })
      setCanvasSize({
        width: (innerWidth / 100) * 50,
        height: innerHeight - 200,
      })
    } else {
      setContainerSize({
        height: innerHeight - 300,
      })
      setCanvasSize({
        width: (innerWidth / 100) * 90,
        height: innerHeight - 300,
      })
    }
  }
  const debounce = useDebounce(resizeHandler, 200)

  React.useEffect(() => {
    window.addEventListener('resize', debounce)
  })

  return (
    <main className='home-page'>
      <div className='game-score-container'>{isGameStarted && <GameScore />}</div>
      <div className='game-board-container' style={containerStyles}>
        <div className='player-settings'>
          {!isGameStarted && <HeroSettings hero='player' speed={playerSpeed} fireRate={playerFireRate} />}
        </div>
        <div className='game-board'>
          <GameBoard
            canvasWidth={canvasSize.width}
            canvasHeight={canvasSize.height}
            isGameStarted={isGameStarted}
            playerSettings={{
              color: playerColor,
              speed: playerSpeed,
              spellColor: playerSpellColor,
              fireRate: playerFireRate,
            }}
            enemySettings={{
              color: enemyColor,
              speed: enemySpeed,
              spellColor: enemySpellColor,
              fireRate: enemyFireRate,
            }}
          />
        </div>
        <div className='enemy-settings'>{!isGameStarted && <HeroSettings hero='enemy' speed={enemySpeed} fireRate={enemyFireRate} />}</div>
      </div>
    </main>
  )
}
