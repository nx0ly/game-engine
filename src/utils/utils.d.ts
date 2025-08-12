// TODO: No clue if it's a good idea to separate, figure out later.
interface Vector {
	x: number;
	y: number;
	z?: number;
}

interface Matrix {
	elements: number[][];
}

interface MathUtilsStruct {
	dimension: number;

	radianToDegree: (radian: number) => number;
	degreeToRadian: (degree: number) => number;
	//fastInvSqrt: (value: number) => number;
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

interface ColorUtilsStruct {
	convertHEXToRGB: (hex: string) => number[];
	convertRGBToHEX: (rgb: number[]) => string;
	convertHSLToRGB: (hsl: number[]) => number[];
	convertRGBToHSL: (rgb: number[]) => number[];
	convertHEXToHSL: (hex: string) => number[];
	convertHSLToHEX: (hsl: number[]) => string;
	convertRGBToHSV: (rgb: number[]) => number[];
	convertHSVToRGB: (hsv: number[]) => number[];
	convertHEXToHSV: (hex: string) => number[];
	convertHSVToHEX: (hsv: number[]) => string;

	darkenColor: (color: string, factor: number) => string;
	lightenColor: (color: string, factor: number) => string;
	saturateColor: (color: string, factor: number) => string;
	desaturateColor: (color: string, factor: number) => string;
	fadeColor: (color: string, factor: number) => string;
	invertColor: (color: string) => string;
}

interface PhysicsUtilsStruct {
	applyGravity: (objects: Vector[]) => void;
}

export type {
	Vector,
	Matrix,
	MathUtilsStruct,
	ColorUtilsStruct,
	PhysicsUtilsStruct,
};
