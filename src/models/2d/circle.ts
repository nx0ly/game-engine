import { MathUTILS } from "../../index"
import { Vector2 } from "../../utils/math"

export class Circle {
	protected origin: Vector2

	public radius: number
	public lineWidth: number

	// colors
	public fillColor: string
	public outlineColor: string

	constructor(
		origin: [number, number],
		radius: number,
		lineWidth: number,
		fillColor: string,
		outlineColor: string,
	) {
		this.origin = new Vector2([...origin])
		this.radius = radius

		this.fillColor = fillColor
		this.outlineColor = outlineColor
		this.lineWidth = lineWidth
	}

	render(
		context: CanvasRenderingContext2D,
		offset: { x: number; y: number } = { x: 0, y: 0 },
	): void {
		context.beginPath()

		context.lineWidth = this.lineWidth
		context.strokeStyle = this.outlineColor
		context.fillStyle = this.fillColor

		context.arc(
			this.origin.x + offset.x,
			this.origin.y + offset.y,
			this.radius,
			0,
			MathUTILS.DPI,
		)
		
		context.stroke()
		context.fill()
	}
}
