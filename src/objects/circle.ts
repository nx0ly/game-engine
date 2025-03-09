import type { Vector } from "../utils/utils";

export class Circle implements Vector {
	public x: number;
	public y: number;
	public z?: number;

	public radius: number;
	public lineWidth: number;

	// colors
	public fillColor: string;
	public outlineColor: string;

	constructor(x: number, y: number, radius: number, z?: number) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.z = z ?? 0;
	}

	render(
		context: CanvasRenderingContext2D,
		offset: { x: number; y: number },
	): void {
		context.beginPath();
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.outlineColor;
		context.fillStyle = this.fillColor;
		context.arc(
			this.x + offset.x,
			this.y + offset.y,
			this.radius,
			0,
			Math.PI * 2,
		);
		context.fill();
		context.stroke();
	}
}
