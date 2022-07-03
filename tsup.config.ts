import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: true,
	entry: ['src/index.ts'],
	format: ['esm', 'cjs', 'iife'],
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: 'es2020',
	tsconfig: 'src/tsconfig.json',
	keepNames: true,
	globalName: 'SapphireBrowserSafeCreateSha256',
	esbuildOptions: (options, context) => {
		switch (context.format) {
			case 'cjs': {
				options.banner = {
					js: [
						//
						'"use strict";',
						'globalThis && globalThis.crypto ? globalThis.crypto : globalThis.crypto = require("crypto");',
						'globalThis && globalThis.TextEncoder ? globalThis.TextEncoder : globalThis.TextEncoder = require("util").TextEncoder;'
					].join('\n')
				};
				break;
			}
			case 'esm': {
				options.banner = {
					js: [
						//
						'import crypto from "crypto";',
						'import { TextEncoder } from "util";',
						'globalThis && globalThis.crypto ? globalThis.crypto : globalThis.crypto = crypto;',
						'globalThis && globalThis.TextEncoder ? globalThis.TextEncoder : globalThis.TextEncoder = TextEncoder;'
					].join('\n')
				};
				break;
			}
			case 'iife': {
				options.banner = {
					js: [
						//
						'const process = undefined;'
					].join('\n')
				};
				break;
			}
		}
	}
});
