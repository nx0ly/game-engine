import Constants from "./constants";
import type { PhysicsUtilsStruct, Vector } from "./utils.d";

export class PhysicsUtils implements PhysicsUtilsStruct {
	applyGravity(objects: Vector[]): void {
		for (const object of objects) {
			object.y -= Constants.gravityAccel;
		}
	}

	/*
	applyMovements(objects: Vector[]): void {
		for (const object of objects) {

		}
	}
	*/
}
