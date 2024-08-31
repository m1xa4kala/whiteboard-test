import { Spell } from './Spell'
import { heroSettings } from './types'
import { Color } from '@/features/colorChange'

export class Hero {
  position: { x: number; y: number }
  heroSettings: {
    color: string
    speed: number
    fireRate: number
    spellColor: Color
  }
  heroRadius: number
  spellVelocity: number
  spellRadius: number
  spellIncrease: number
  projectiles: Spell[]
  mousePosition: { x: number; y: number }
  mouseClickPosition: { x: number; y: number }
  constructor(position: { x: number; y: number }, heroSettings: heroSettings, spellVelocity: number, heroRadius: number) {
    this.position = { x: position.x, y: position.y }
    this.heroSettings = heroSettings
    this.heroRadius = heroRadius
    this.spellVelocity = spellVelocity
    this.spellRadius = 6
    this.spellIncrease = 0.5 * heroSettings.fireRate
    this.projectiles = []
    this.mousePosition = { x: 0, y: 0 }
    this.mouseClickPosition = { x: 0, y: 0 }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.heroRadius, 0, Math.PI * 2, true)
    ctx.lineWidth = 4
    ctx.strokeStyle = this.heroSettings.color
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.spellRadius, 0, Math.PI * 2, true)
    ctx.lineWidth = 1
    ctx.fillStyle = this.heroSettings.spellColor
    ctx.fill()
    const spell = new Spell({ x: this.position.x, y: this.position.y }, this.heroSettings.spellColor, this.spellVelocity, 8)
    this.projectiles.forEach(() => {
      spell.draw(ctx)
    })
  }
  update(ctx: CanvasRenderingContext2D, boardHeight: number) {
    this.draw(ctx)

    if (this.position.y + this.heroRadius + 4 > boardHeight || this.position.y - this.heroRadius - 4 < 0) {
      this.heroSettings.speed = -this.heroSettings.speed
    }
    this.position.y += 1 * this.heroSettings.speed

    if (this.spellRadius >= 18 || this.spellRadius <= 4) {
      this.spellIncrease = -this.spellIncrease
    }
    this.spellRadius += this.spellIncrease

    if (this.spellRadius <= 4) {
      this.projectiles.push(new Spell({ x: this.position.x, y: this.position.y }, this.heroSettings.spellColor, this.spellVelocity, 8))
    }

    const distance = Math.hypot(this.position.x - this.mousePosition.x, this.position.y - this.mousePosition.y)
    if (distance <= this.heroRadius + 2 && distance >= this.heroRadius - 2) {
      if (this.mousePosition.y > this.position.y && this.heroSettings.speed > 0) {
        this.heroSettings.speed = -this.heroSettings.speed
      }
      if (this.mousePosition.y < this.position.y && this.heroSettings.speed < 0) {
        this.heroSettings.speed = -this.heroSettings.speed
      }
    }
  }

  click() {
    const distance = Math.hypot(this.position.x - this.mouseClickPosition.x, this.position.y - this.mouseClickPosition.y)
    if (distance < this.heroRadius + 2) {
      return true
    }
  }
}
