import { MathUTILS } from "..";
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

	constructor(position: { x: number, y: number; z?: number }, radius: number, lineWidth: number, fillColor: string, outlineColor: string) {
		this.x = position.x;
		this.y = position.y;
		this.radius = radius;
		this.z = position.z ?? 0;

		this.fillColor = fillColor;
		this.outlineColor = outlineColor;
		this.lineWidth = lineWidth;
	}

	render(
		context: CanvasRenderingContext2D,
		offset: { x: number; y: number } = { x: 0, y: 0 },
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
			MathUTILS.DPI,
		);
		context.fill();
		context.stroke();
	}
}
