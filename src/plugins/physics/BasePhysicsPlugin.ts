import Plugin from "../plugin"
import { PluginEngine } from "../pluginEngine"

class BasePhysicsPlugin implements Plugin {
	name = "BasicPhysics"

	initialize(engine: PluginEngine): void {
		console.log("Physics plugin initialized!")
		engine.onUpdate((dt) => this.update?.(dt))
	}

	update(deltaTime: number): void {}
}
