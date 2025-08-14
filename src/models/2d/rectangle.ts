import { PI, Vector2 } from "../../utils/math"
import z from "zod"

const Rotation = z
	.number()
	.min(0)
	.max(PI * 2)
	.brand("Rotation")
type Rotation = z.infer<typeof Rotation>

type OptionalParams = {
	rounded: boolean
	roundValue: number
	shouldFill: boolean
	shouldStroke: boolean
	lineWidth: number
}

export class Rectangle {
	protected pos: Vector2

	public width: number
	public height: number
	public rotation: Rotation // this.rotation.parse(val)
	private optional: OptionalParams

	public fillStyle: string
	public strokeStyle: string
	public shouldFill: boolean
	public shouldStroke: boolean

	constructor(
		origin: Vector2,
		dimensions: [number, number],
		fillStyle: string,
		strokeStyle: string,
		optionalParams: Partial<OptionalParams> = {},
	) {
		this.optional = {
			...{
				rounded: false,
				roundValue: 12,
				shouldFill: true,
				shouldStroke: true,
				lineWidth: 5.5,
			},
			...optionalParams,
		} satisfies OptionalParams

		this.pos = origin

		this.width = dimensions[0]
		this.height = dimensions[1]

		this.fillStyle = fillStyle
		this.strokeStyle = strokeStyle
	}

	// Possibly do the layering method if needed so the corners look the same.
    // Right now the larger the lineWidth = the larger the stroke corner.
	public render(
		context: CanvasRenderingContext2D,
		offset: { x: number; y: number } = { x: 0, y: 0 },
	): void {
		context.beginPath()
		context.translate(offset.x, offset.y)

		context.fillStyle = this.fillStyle
		context.strokeStyle = this.strokeStyle

		context.lineWidth = this.optional.lineWidth

		context[this.optional.rounded ? "roundRect" : "rect"](
			this.pos.x,
			this.pos.y,
			this.width,
			this.height,
			this.optional.rounded ? this.optional.roundValue : undefined,
		)

		if (this.optional.shouldStroke) context.stroke()
		if (this.optional.shouldFill) context.fill()
	}
}
