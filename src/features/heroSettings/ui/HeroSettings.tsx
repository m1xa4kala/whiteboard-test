import React from 'react'
import { useAppDispatch } from '@/shared/lib'
import { setEnemyFireRate, setEnemySpeed, setPlayerFireRate, setPlayerSpeed } from '../model/heroSettingsSlice'

import './HeroSettings.scss'

type HeroSettingsProps = {
  hero: 'player' | 'enemy'
  speed: number
  fireRate: number
}

export const HeroSettings: React.FC<HeroSettingsProps> = ({ hero, speed, fireRate }) => {
  const dispatch = useAppDispatch()

  const isPlayer = hero === 'player'

  const handleChangeSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isPlayer) {
      dispatch(setPlayerSpeed(+event.target.value))
    } else {
      dispatch(setEnemySpeed(+event.target.value))
    }
  }
  const handleChangeFireRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isPlayer) {
      dispatch(setPlayerFireRate(+event.target.value))
    } else {
      dispatch(setEnemyFireRate(+event.target.value))
    }
  }
  return (
    <div className='hero-settings'>
      <h2>{hero.toUpperCase()} SETTINGS</h2>
      <div className='speed-settings'>
        <h3>Speed: </h3>
        <input key={speed + hero} id='speed' type='range' min={1} max={5} value={speed} step={0.2} onChange={(e) => handleChangeSpeed(e)} />
      </div>
      <div className='fire-rate-settings'>
        <h3>Fire rate: </h3>
        <input
          key={fireRate + hero}
          id='fire-rate'
          type='range'
          min={1}
          max={5}
          value={fireRate}
          step={0.2}
          onChange={(e) => handleChangeFireRate(e)}
        />
      </div>
    </div>
  )
}
