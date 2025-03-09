import { max, min, sqrt, atan2, cos, sin } from "../utils/math";
import type { CanvasRenderingContext2DTypes } from "./render";

export class RenderContext {
	public type: CanvasRenderingContext2DTypes;
	public context: CanvasRenderingContext2D;
	public canvas: HTMLCanvasElement;

	constructor(type: CanvasRenderingContext2DTypes) {
		this.type = type;

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext(type) as CanvasRenderingContext2D;
	}

	setRectangularBoundary(width: number, height: number): void {
		const DPI = window.devicePixelRatio;
		this.canvas.style.width = `${width}px`;
		this.canvas.style.height = `${height}px`;

		this.canvas.width = width * DPI;
		this.canvas.height = height * DPI;
	}

	setCircularBoundary(radius: number): void {
		const DPI = window.devicePixelRatio;
		this.canvas.style.width = `${radius}px`;
		this.canvas.style.height = `${radius}px`;

		this.canvas.width = radius * DPI;
		this.canvas.height = radius * DPI;

		// set border radius to 50% for circular canvas
		this.canvas.style.borderRadius = "50%";
	}
}
