import { Color } from '@/features/colorChange'

export class Spell {
  position: { x: number; y: number }
  color: Color
  velocity: number
  radius: number

  constructor(position: { x: number; y: number }, color: Color, velocity: number) {
    this.position = { x: position.x, y: position.y }
    this.color = color
    this.velocity = velocity
    this.radius = 4
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true)
    ctx.lineWidth = 1
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx)
    this.position.x += this.velocity
  }
}
