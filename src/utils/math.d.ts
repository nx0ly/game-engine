interface Vector {
	x: number;
	y: number;
	z: number;
}

interface Matrix {
	elements: number[][];
}

interface UtilsStruct {
	radianToDegree: (radian: number) => number;
	degreeToRadian: (degree: number) => number;
	fastInvSqrt: (value: number) => number;
	dotProduct: (vector1: Vector, vector2: Vector) => number;
	crossProduct: (vector1: Vector, vector2: Vector) => Vector;
	multiplyMatrix: (matrix1: Matrix, matrix2: Matrix) => Matrix;
	multiplyVector: (matrix: Matrix, vector: Vector) => Vector;
	rotateVector: (vector: Vector, angle: number) => Vector;
	scaleVector: (vector: Vector, scalar: number) => Vector;
	translateVector: (vector: Vector, translation: Vector) => Vector;
	transposeMatrix: (matrix: Matrix) => Matrix;
	determinantMatrix: (matrix: Matrix) => number;
	inverseMatrix: (matrix: Matrix) => Matrix;
}

export type { Vector, Matrix, UtilsStruct };
