import { Vector2 } from "../../utils/math"
import type { Vector } from "../../utils/utils"

type LineCapTypes = "butt" | "round" | "square"

export class Line {
	protected origin: Vector2
	protected end: Vector2

	public lineWidth: number
	public strokeStyle: string
	public lineCap: LineCapTypes

	constructor(
		origin: Vector2,
		end: Vector2,
		lineWidth: number,
		strokeStyle: string,
		lineCap: LineCapTypes,
	) {
		this.origin = origin
		this.end = end

		this.lineWidth = lineWidth || 4
		this.strokeStyle = strokeStyle || "#000"
		this.lineCap = lineCap || "butt"
	}

	render(
		context: CanvasRenderingContext2D,
		offset: { x: number; y: number } = { x: 0, y: 0 },
	): void {
		context.beginPath()

		context.lineCap = this.lineCap
		context.lineWidth = this.lineWidth
		context.strokeStyle = this.strokeStyle

		context.moveTo(this.origin.x + offset.x, this.origin.y + offset.y)
		context.lineTo(this.end.x + offset.x, this.end.y + offset.y)

		context.stroke()
	}
}
