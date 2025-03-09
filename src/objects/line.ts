import type { Vector } from "../utils/utils";

export class Line implements Vector {
	public x: number;
	public x2: number;
	public y: number;
	public y2: number;
	public z?: number;
	public z2?: number;

	public lineWidth: number;
	public strokeStyle: string;
	public fillStyle: string;

	constructor(
		start: { x: number; y: number; z?: number },
		end: { x: number; y: number; z?: number },
		lineWidth: number,
		strokeStyle: string,
		fillStyle: string,
	) {
		this.x = start.x;
		this.y = start.y;
		this.z = start.z ?? 0;

		this.x2 = end.x;
		this.y2 = end.y;
		this.z2 = end.z ?? 0;

		this.lineWidth = lineWidth;
		this.strokeStyle = strokeStyle;
		this.fillStyle = fillStyle;
	}

	render(
		context: CanvasRenderingContext2D,
		offset: { x: number; y: number },
	): void {
		context.beginPath();
		context.lineCap = "round";
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.strokeStyle;
		context.fillStyle = this.fillStyle;
		context.moveTo(this.x + offset.x, this.y + offset.y);
		context.lineTo(this.x2 + offset.x, this.y2 + offset.y);
		context.stroke();
	}
}
