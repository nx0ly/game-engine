import type { Matrix, Vector, UtilsStruct } from "./math.d";

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

class MathUtils implements UtilsStruct {
	public dimension: number;

	constructor(dimension: number) {
		this.dimension = dimension;
	}

	radianToDegree(radian: number): number {
		return (radian * 180) / PI;
	}

	degreeToRadian(degree: number): number {
		return (degree * PI) / 180;
	}

	// ? https://en.wikipedia.org/wiki/Fast_inverse_square_root
	// TODO: Compare effectiveness of this method with native Math.sqrt()
	fastInvSqrt(value: number): number {
		const halfValue = 0.5 * value;
		let y = value;
		const threehalfs = 1.5;

		const buf = new ArrayBuffer(4);
		const f32 = new Float32Array(buf);
		const u32 = new Uint32Array(buf);

		f32[0] = value;
		u32[0] = 0x5f3759df - (u32[0] >> 1);
		y = f32[0];

		y = y * (threehalfs - halfValue * y * y);

		return y;
	}

	dotProduct(vector1: Vector, vector2: Vector): number {
		switch (this.dimension) {
			case 2:
				return vector1.x * vector2.x + vector1.y * vector2.y;

			case 3:
				return (
					vector1.x * vector2.x + vector1.y * vector2.y + (vector2.z ?? 0) * (vector2.z ?? 0)
				);

			default:
				return vector1.x * vector2.x + vector1.y * vector2.y;
		}
	}

	// TODO: Add multi dimensional support
	crossProduct(vector1: Vector, vector2: Vector): Vector {
		return {
			x: vector1.y * (vector2.z ?? 0) - (vector2.z ?? 0) * vector2.y,
			y: (vector2.z ?? 0) * vector2.x - vector1.x * (vector2.z ?? 0),
			z: vector1.x * vector2.y - vector1.y * vector2.x,
		};
	}

	multiplyMatrix(matrix1: Matrix, matrix2: Matrix): Matrix {
		const matrix: Matrix = { elements: [] };

		for (let i = 0; i < matrix1.elements.length; i++) {
			matrix.elements.push([]);

			for (let j = 0; j < matrix2.elements[0].length; j++) {
				let sum = 0;

				for (let k = 0; k < matrix1.elements[0].length; k++) {
					sum += matrix1.elements[i][k] * matrix2.elements[k][j];
				}

				matrix.elements[i].push(sum);
			}
		}

		return matrix;
	}

	multiplyVector(matrix: Matrix, vector: Vector): Vector {
		switch (this.dimension) {
			case 2:
				return {
					x:
						matrix.elements[0][0] * vector.x + matrix.elements[0][1] * vector.y,
					y:
						matrix.elements[1][0] * vector.x + matrix.elements[1][1] * vector.y,
				};

			case 3:
				return {
					x:
						matrix.elements[0][0] * vector.x +
						matrix.elements[0][1] * vector.y +
						matrix.elements[2][2] * (vector.z ?? 0),
					y:
						matrix.elements[1][0] * vector.x +
						matrix.elements[1][1] * vector.y +
						matrix.elements[2][2] * (vector.z ?? 0),
					z:
						matrix.elements[2][0] * vector.x +
						matrix.elements[2][1] * vector.y +
						matrix.elements[2][2] * (vector.z ?? 0),
				};

			default:
				return {
					x:
						matrix.elements[0][0] * vector.x + matrix.elements[0][1] * vector.y,
					y:
						matrix.elements[1][0] * vector.x + matrix.elements[1][1] * vector.y,
				};
		}
	}

	rotateVector(vector: Vector, angle: number): Vector {
		const cosAng = cos(angle);
		const sinAng = sin(angle);

        switch (this.dimension) {
            case 2:
                return {
                    x: vector.x * cosAng - vector.y * sinAng,
                    y: vector.x * sinAng + vector.y * cosAng,
                };

            case 3:
                return {
                    x: vector.x * cosAng - vector.y * sinAng,
                    y: vector.x * sinAng + vector.y * cosAng,
                    z: vector.z,
                };

            default:
                return {
                    x: vector.x * cosAng - vector.y * sinAng,
                    y: vector.x * sinAng + vector.y * cosAng,
                };
        }
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
			z: vector.z !== undefined && translation.z !== undefined ? vector.z + translation.z : undefined,
		};
	}

	transposeMatrix(matrix: Matrix): Matrix {
		const transposedMatrix: Matrix = { elements: [] };

		for (let i = 0; i < matrix.elements[0].length; i++) {
			transposedMatrix.elements.push([]);

			for (let j = 0; j < matrix.elements.length; j++) {
				transposedMatrix.elements[i].push(matrix.elements[j][i]);
			}
		}

		return transposedMatrix;
	}

	determinantMatrix(matrix: Matrix): number {
		if (matrix.elements.length === 2) {
			return (
				matrix.elements[0][0] * matrix.elements[1][1] -
				matrix.elements[0][1] * matrix.elements[1][0]
			);
		}

		let sum = 0;

		for (let i = 0; i < matrix.elements.length; i++) {
			const minor: Matrix = { elements: [] };

			for (let j = 1; j < matrix.elements.length; j++) {
				minor.elements.push([]);

				for (let k = 0; k < matrix.elements.length; k++) {
					if (k !== i) {
						minor.elements[j - 1].push(matrix.elements[j][k]);
					}
				}
			}

			sum +=
				matrix.elements[0][i] *
				this.determinantMatrix(minor) *
				(i % 2 === 0 ? 1 : -1);
		}

		return sum;
	}

	inverseMatrix(matrix: Matrix): Matrix {
		const determinant = this.determinantMatrix(matrix);

		if (determinant === 0) {
			throw new Error("matrix is singular");
		}

		const inverseMatrix: Matrix = { elements: [] };

		for (let i = 0; i < matrix.elements.length; i++) {
			inverseMatrix.elements.push([]);

			for (let j = 0; j < matrix.elements.length; j++) {
				const minor: Matrix = { elements: [] };

				for (let k = 0; k < matrix.elements.length; k++) {
					if (k !== j) {
						minor.elements.push([]);

						for (let l = 0; l < matrix.elements.length; l++) {
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
