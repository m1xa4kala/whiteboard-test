import { Spell } from './Spell'
import { Color, heroSettings } from './types'

export class Hero {
  position: { x: number; y: number }
  heroSettings: {
    color: string
    velocity: number
    fireRate: number
    spellColor: Color
  }
  spellVelocity: number
  spellSize: number
  spellIncrease: number
  projectiles: Spell[]
  constructor(position: { x: number; y: number }, heroSettings: heroSettings, spellVelocity: number) {
    this.position = { x: position.x, y: position.y }
    this.heroSettings = heroSettings
    this.spellVelocity = spellVelocity
    this.spellSize = 6
    this.spellIncrease = heroSettings.fireRate
    this.projectiles = []
  }

  draw(ctx: CanvasRenderingContext2D) {
    const radius = 30
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2, true)
    ctx.lineWidth = 4
    ctx.strokeStyle = this.heroSettings.color
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.spellSize, 0, Math.PI * 2, true)
    ctx.lineWidth = 1
    ctx.fillStyle = this.heroSettings.spellColor
    ctx.fill()
    const spell = new Spell({ x: this.position.x, y: this.position.y }, this.heroSettings.spellColor, this.spellVelocity)
    this.projectiles.forEach(() => {
      spell.draw(ctx)
    })
  }
  update(ctx: CanvasRenderingContext2D, boardHeight: number) {
    this.draw(ctx)

    if (this.position.y + 30 > boardHeight || this.position.y - 30 < 0) {
      this.heroSettings.velocity = -this.heroSettings.velocity
    }
    this.position.y += this.heroSettings.velocity

    if (this.spellSize >= 18 || this.spellSize <= 4) {
      this.spellIncrease = -this.spellIncrease
    }
    this.spellSize += this.spellIncrease

    if (this.spellSize <= 4) {
      this.projectiles.push(new Spell({ x: this.position.x, y: this.position.y }, this.heroSettings.spellColor, this.spellVelocity))
    }
  }
  click(mouseX: number, mouseY: number) {
    const distance = Math.hypot(this.position.x - mouseX, this.position.y - mouseY)
    if (distance < 32) {
      return true
    }
  }
}
