import { abs, max, min } from "./math";
import type { ColorUtilsStruct } from "./utils";

export class ColorUtils implements ColorUtilsStruct {
	convertHEXToRGB(hex: string): number[] {
		const r = Number.parseInt(hex.substring(1, 3), 16) / 255;
		const g = Number.parseInt(hex.substring(3, 5), 16) / 255;
		const b = Number.parseInt(hex.substring(5, 7), 16) / 255;

		return [r, g, b];
	}

	convertRGBToHEX(rgb: number[]): string {
		return `#${rgb.map((color) => ((color * 255) | 0).toString(16).padStart(2, "0")).join("")}`;
	}

	convertHSLToRGB(hsl: number[]): number[] {
		const [h, s, l] = hsl;

		const c = (1 - abs(2 * l - 1)) * s;
		const x = c * (1 - abs(((h / 60) % 2) - 1));
		const m = l - c / 2;

		const [r, g, b] = [
			[c, x, 0],
			[x, c, 0],
			[0, c, x],
			[0, x, c],
			[x, 0, c],
			[c, 0, x],
		][((h / 60) | 0) % 6];

		return [r + m, g + m, b + m];
	}

	convertRGBToHSL(rgb: number[]): number[] {
		const [r, g, b] = rgb;

		const Max = max(r, g, b);
		const Min = min(r, g, b);

		const l = (Max + Min) / 2;
		const d = Max - Min;

		if (d === 0) return [0, 0, l];

		const s = d / (1 - abs(2 * l - 1));
		const h =
			(Max === r
				? (g - b) / d + (g < b ? 6 : 0)
				: Max === g
					? (b - r) / d + 2
					: (r - g) / d + 4) * 60;

		return [h, s, l];
	}

	convertHEXToHSL(hex: string): number[] {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		if (!result) {
			throw new Error("could not parse hex code, color utils convertHEXToHSL");
		}

		const r = Number.parseInt(result[1], 16) / 255;
		const g = Number.parseInt(result[2], 16) / 255;
		const b = Number.parseInt(result[3], 16) / 255;

		const Max = max(r, g, b);
		const Min = min(r, g, b);

		const l = (Max + Min) / 2;

		if (Max === Min) return [0, 0, l * 100];

		const d = Max - Min;
		const s = l > 0.5 ? d / (2 - Max - Min) : d / (Max + Min);
		const h =
			(Max === r
				? (g - b) / d + (g < b ? 6 : 0)
				: Max === g
					? (b - r) / d + 2
					: (r - g) / d + 4) * 60;

		return [h, s * 100, l * 100];
	}

	convertHSLToHEX(hsl: number[]): string {
		const [h, s, l] = hsl;

		const c = (1 - abs(2 * l - 1)) * s;
		const x = c * (1 - abs(((h / 60) % 2) - 1));

		const m = l - c / 2;

		const [r, g, b] = [
			[c, x, 0],
			[x, c, 0],
			[0, c, x],
			[0, x, c],
			[x, 0, c],
			[c, 0, x],
		][((h / 60) | 0) % 6];

		return `#${[((r + m) * 255) | 0, ((g + m) * 255) | 0, ((b + m) * 255) | 0].map((color) => color.toString(16).padStart(2, "0")).join("")}`;
	}

	convertRGBToHSV(rgb: number[]): number[] {
		const [r, g, b] = rgb;

		const Max = max(r, g, b);
		const Min = min(r, g, b);

		const d = Max - Min;
		const s = Max === 0 ? 0 : d / Max;
		const v = Max;
		const h =
			d === 0
				? 0
				: (Max === r
						? (g - b) / d + (g < b ? 6 : 0)
						: Max === g
							? (b - r) / d + 2
							: (r - g) / d + 4) * 60;

		return [h, s * 100, v * 100];
	}

	convertHSVToRGB(hsv: number[]): number[] {
		const [h, s, v] = hsv;

		const c = v * s;
		const x = c * (1 - abs(((h / 60) % 2) - 1));
		const m = v - c;
		const [r, g, b] = [
			[c, x, 0],
			[x, c, 0],
			[0, c, x],
			[0, x, c],
			[x, 0, c],
			[c, 0, x],
		][((h / 60) | 0) % 6];

		return [r + m, g + m, b + m];
	}

	convertHEXToHSV(hex: string): number[] {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		if (!result) {
			throw new Error("could not parse hex code, color utils convertHEXToHSV");
		}

		const r = Number.parseInt(result[1], 16) / 255;
		const g = Number.parseInt(result[2], 16) / 255;
		const b = Number.parseInt(result[3], 16) / 255;

		const Max = max(r, g, b);
		const Min = min(r, g, b);

		const d = Max - Min;
		const s = Max === 0 ? 0 : d / Max;
		const v = Max;
		const h =
			d === 0
				? 0
				: (Max === r
						? (g - b) / d + (g < b ? 6 : 0)
						: Max === g
							? (b - r) / d + 2
							: (r - g) / d + 4) * 60;

		return [h, s * 100, v * 100];
	}

	convertHSVToHEX(hsv: number[]): string {
		const [h, s, v] = hsv;

		const c = v * s;
		const x = c * (1 - abs(((h / 60) % 2) - 1));
		const m = v - c;
		const [r, g, b] = [
			[c, x, 0],
			[x, c, 0],
			[0, c, x],
			[0, x, c],
			[x, 0, c],
			[c, 0, x],
		][((h / 60) | 0) % 6];

		return `#${[((r + m) * 255) | 0, ((g + m) * 255) | 0, ((b + m) * 255) | 0].map((color) => color.toString(16).padStart(2, "0")).join("")}`;
	}

	darkenColor(hex: string, amount: number): string {
		const [r, g, b] = this.convertHEXToRGB(hex);

		return this.convertRGBToHEX([r * amount, g * amount, b * amount]);
	}

	lightenColor(hex: string, amount: number): string {
		const [r, g, b] = this.convertHEXToRGB(hex);

		return this.convertRGBToHEX([
			r + (1 - r) * amount,
			g + (1 - g) * amount,
			b + (1 - b) * amount,
		]);
	}

	saturateColor(hex: string, amount: number): string {
		const [h, s, l] = this.convertHEXToHSL(hex);

		return this.convertHSLToHEX([h, s + (1 - s) * amount, l]);
	}

	desaturateColor(hex: string, amount: number): string {
		const [h, s, l] = this.convertHEXToHSL(hex);

		return this.convertHSLToHEX([h, s * amount, l]);
	}

	fadeColor(hex: string, amount: number): string {
		const [r, g, b] = this.convertHEXToRGB(hex);

		return this.convertRGBToHEX([r, g, b, amount]);
	}

	invertColor(hex: string): string {
		const [r, g, b] = this.convertHEXToRGB(hex);

		return this.convertRGBToHEX([1 - r, 1 - g, 1 - b]);
	}
}
