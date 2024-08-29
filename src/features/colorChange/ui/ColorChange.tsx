import React from 'react'
import { Color } from '../model/types'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { setEnemyColor, setEnemySpellColor, setPlayerColor, setPlayerSpellColor } from '../model/heroColorSlice'

import './ColorChange.scss'

export const ColorChange: React.FC = () => {
  const dispatch = useAppDispatch()
  const isPlayerMenuOpen = useAppSelector((state) => state.heroColor.playerMenuOpen)
  const isEnemyMenuOpen = useAppSelector((state) => state.heroColor.enemyMenuOpen)
  const playerColor = useAppSelector((state) => state.heroColor.playerColor)
  const playerSpellColor = useAppSelector((state) => state.heroColor.playerSpellColor)
  const enemyColor = useAppSelector((state) => state.heroColor.enemyColor)
  const enemySpellColor = useAppSelector((state) => state.heroColor.enemySpellColor)

  const handleChangeColor = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (isPlayerMenuOpen) {
        dispatch(setPlayerColor(event.target.value as Color))
      }
      if (isEnemyMenuOpen) {
        dispatch(setEnemyColor(event.target.value as Color))
      }
    },
    [dispatch, isEnemyMenuOpen, isPlayerMenuOpen]
  )

  const handleChangeSpellColor = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (isPlayerMenuOpen) {
        dispatch(setPlayerSpellColor(event.target.value as Color))
      }
      if (isEnemyMenuOpen) {
        dispatch(setEnemySpellColor(event.target.value as Color))
      }
    },
    [dispatch, isEnemyMenuOpen, isPlayerMenuOpen]
  )

  return (
    <div className='color-change' style={isPlayerMenuOpen || isEnemyMenuOpen ? { display: 'flex' } : { display: 'none' }}>
      <h2>CHOOSE {isPlayerMenuOpen ? 'YOUR' : 'ENEMY'} COLOR</h2>
      <div>
        <h3>Hero color: </h3>
        <select
          id='hero-color'
          key={isPlayerMenuOpen ? `${playerColor + isPlayerMenuOpen}` : `${enemyColor + isPlayerMenuOpen}`}
          onChange={(e) => handleChangeColor(e)}
          defaultValue={isPlayerMenuOpen ? playerColor : enemyColor}
        >
          <option value={Color.red}>Red</option>
          <option value={Color.green}>Green</option>
          <option value={Color.blue}>Blue</option>
          <option value={Color.yellow}>Yellow</option>
          <option value={Color.orange}>Orange</option>
          <option value={Color.purple}>Purple</option>
        </select>
      </div>
      <div>
        <h3>Spell color: </h3>
        <select
          id='spell-color'
          key={isPlayerMenuOpen ? playerSpellColor : enemySpellColor}
          onChange={(e) => handleChangeSpellColor(e)}
          defaultValue={isPlayerMenuOpen ? playerSpellColor : enemySpellColor}
        >
          <option value={Color.red}>Red</option>
          <option value={Color.green}>Green</option>
          <option value={Color.blue}>Blue</option>
          <option value={Color.yellow}>Yellow</option>
          <option value={Color.orange}>Orange</option>
          <option value={Color.purple}>Purple</option>
        </select>
      </div>
    </div>
  )
}
