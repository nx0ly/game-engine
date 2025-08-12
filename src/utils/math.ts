import type { Matrix, Vector, MathUtilsStruct } from "./utils";

export const {
	sin,
	cos,
	tan,
	sqrt,
	PI,
	abs,
	round,
	ceil,
	random,
	max,
	min,
	log,
	exp,
	atan2,
} = Math;

export class Vector2 implements Vector {
	x: number;
	y: number;

	constructor(pos: [number, number]) {
		this.x = pos[0];
		this.y = pos[1];
	}
}

export class Vector3 implements Vector {
	x: number;
	y: number;
	z: number;

	constructor(pos: [number, number, number]) {
		this.x = pos[0];
		this.y = pos[1];
		this.z = pos[2];
	}
}


export class MathUtils implements MathUtilsStruct {
	public dimension: number;

	constructor(dimension: number) {
		this.dimension = dimension;
	}

	get DPI(): number {
		return 2 * PI;
	}

	radianToDegree(radian: number): number {
		return (radian * 180) / PI;
	}

	degreeToRadian(degree: number): number {
		return (degree * PI) / 180;
	}

	// ? https://en.wikipedia.org/wiki/Fast_inverse_square_root
	// TODO: Compare effectiveness of this method with native Math.sqrt()
	// I compared; this is very slow compared to native Math.sqrt.
	// See: https://jsbm.dev/PoCsPcz3mGhTB
	/*
	fastInvSqrt(value: number): number {
		const halfValue = 0.5 * value;
		let y = value;
		const threeHalfs = 1.5;

		const buf = new ArrayBuffer(4);
		const f32 = new Float32Array(buf);
		const u32 = new Uint32Array(buf);

		f32[0] = value;
		u32[0] = 0x5f3759df - (u32[0] >> 1);
		y = f32[0];

		y = y * (threeHalfs - halfValue * y * y);

		return y;
	}
	*/

	dotProduct(vector1: Vector, vector2: Vector): number {
		return (
			vector1.x * vector2.x +
			vector1.y * vector2.y +
			(this.dimension === 3 ? (vector1.z ?? 0) * (vector2.z ?? 0) : 0)
		);
	}

	crossProduct(vector1: Vector, vector2: Vector): Vector {
		return {
			x: vector1.y * (vector2.z ?? 0) - (vector1.z ?? 0) * vector2.y,
			y: (vector1.z ?? 0) * vector2.x - vector1.x * (vector2.z ?? 0),
			z: vector1.x * vector2.y - vector1.y * vector2.x,
		};
	}

	multiplyMatrix(matrix1: Matrix, matrix2: Matrix): Matrix {
		const matrix: Matrix = { elements: [] };
		const rows = matrix1.elements.length;
		const cols = matrix2.elements[0].length;
		const commonDim = matrix1.elements[0].length;

		for (let i = 0; i < rows; i++) {
			matrix.elements.push([]);
			for (let j = 0; j < cols; j++) {
				let sum = 0;
				for (let k = 0; k < commonDim; k++) {
					sum += matrix1.elements[i][k] * matrix2.elements[k][j];
				}
				matrix.elements[i].push(sum);
			}
		}

		return matrix;
	}

	multiplyVector(matrix: Matrix, vector: Vector): Vector {
		const elements = matrix.elements;
		const x = vector.x;
		const y = vector.y;
		const z = vector.z ?? 0;

		if (this.dimension === 2) {
			return {
				x: elements[0][0] * x + elements[0][1] * y,
				y: elements[1][0] * x + elements[1][1] * y,
			};
		}

		if (this.dimension === 3) {
			return {
				x: elements[0][0] * x + elements[0][1] * y + elements[0][2] * z,
				y: elements[1][0] * x + elements[1][1] * y + elements[1][2] * z,
				z: elements[2][0] * x + elements[2][1] * y + elements[2][2] * z,
			};
		}
		return {
			x: elements[0][0] * x + elements[0][1] * y,
			y: elements[1][0] * x + elements[1][1] * y,
		};
	}

	rotateVector(vector: Vector, angle: number): Vector {
		const cosAng = cos(angle);
		const sinAng = sin(angle);

		const x = vector.x;
		const y = vector.y;
		const z = vector.z ?? 0;

		if (this.dimension === 2) {
			return {
				x: x * cosAng - y * sinAng,
				y: x * sinAng + y * cosAng,
			};
		}

		if (this.dimension === 3) {
			return {
				x: x * cosAng - y * sinAng,
				y: x * sinAng + y * cosAng,
				z: z,
			};
		}

		return {
			x: x * cosAng - y * sinAng,
			y: x * sinAng + y * cosAng,
		};
	}

	scaleVector(vector: Vector, scalar: number): Vector {
		return {
			x: vector.x * scalar,
			y: vector.y * scalar,
			z: vector.z !== undefined ? vector.z * scalar : undefined,
		};
	}

	translateVector(vector: Vector, translation: Vector): Vector {
		return {
			x: vector.x + translation.x,
			y: vector.y + translation.y,
			z:
				vector.z !== undefined && translation.z !== undefined
					? vector.z + translation.z
					: undefined,
		};
	}

	transposeMatrix(matrix: Matrix): Matrix {
		const transposedMatrix: Matrix = { elements: [] };
		const rows = matrix.elements.length;
		const cols = matrix.elements[0].length;

		for (let i = 0; i < cols; i++) {
			transposedMatrix.elements.push([]);

			for (let j = 0; j < rows; j++) {
				transposedMatrix.elements[i].push(matrix.elements[j][i]);
			}
		}

		return transposedMatrix;
	}

	determinantMatrix(matrix: Matrix): number {
		const elements = matrix.elements;
		const size = elements.length;

		if (size === 2) {
			return elements[0][0] * elements[1][1] - elements[0][1] * elements[1][0];
		}

		let sum = 0;
		for (let i = 0; i < size; i++) {
			const minor: Matrix = { elements: [] };

			for (let j = 1; j < size; j++) {
				minor.elements.push([]);

				for (let k = 0; k < size; k++) {
					if (k !== i) {
						minor.elements[j - 1].push(elements[j][k]);
					}
				}
			}

			sum +=
				elements[0][i] * this.determinantMatrix(minor) * (i % 2 === 0 ? 1 : -1);
		}

		return sum;
	}

	inverseMatrix(matrix: Matrix): Matrix {
		const determinant = this.determinantMatrix(matrix);
		if (determinant === 0) {
			throw new Error("matrix is singular");
		}

		const size = matrix.elements.length;
		const inverseMatrix: Matrix = { elements: [] };

		// lolz O(n^4)

		for (let i = 0; i < size; i++) {
			inverseMatrix.elements.push([]);

			for (let j = 0; j < size; j++) {
				const minor: Matrix = { elements: [] };

				for (let k = 0; k < size; k++) {
					if (k !== j) {
						minor.elements.push([]);

						for (let l = 0; l < size; l++) {
							if (l !== i) {
								minor.elements[minor.elements.length - 1].push(
									matrix.elements[k][l],
								);
							}
						}
					}
				}

				inverseMatrix.elements[i].push(
					(this.determinantMatrix(minor) * ((i + j) % 2 === 0 ? 1 : -1)) /
						determinant,
				);
			}
		}

		return this.transposeMatrix(inverseMatrix);
	}
}
