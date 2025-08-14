import { PluginEngine } from "./pluginEngine"

export default interface Plugin {
	name: string
	initialize(engine: PluginEngine): void
	update?(deltaTime: number): void
	destroy?(): void
}
