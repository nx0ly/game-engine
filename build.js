require("esbuild")
	.build({
		entryPoints: ["src/index.ts"],
		bundle: true,
		treeShaking: true,
		//minify: true,
		sourcemap: true,
		target: "es2020",
		outfile: "dist/index.js",
	})
	.catch(() => process.exit(1));
