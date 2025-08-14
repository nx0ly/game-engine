import Plugin from "./plugin"

export class PluginEngine {
	private plugins: Plugin[] = []
	private updateHandlers: ((dt: number) => void)[] = []

	addPlugin(plugin: Plugin): void {
		plugin.initialize(this)
		this.plugins.push(plugin)
	}

	onUpdate(handler: (dt: number) => void): void {
		this.updateHandlers.push(handler)
	}

	run() {
		this.updateHandlers.forEach((fn) => fn(NaN))
	}
}
