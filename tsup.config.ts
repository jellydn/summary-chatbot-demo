import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    external: ['react'],
    clean: true,
    format: ['cjs', 'esm'],
    esbuildOptions(options, context) {
        options.assetNames = 'assets/[name]';
    },
    loader: {
        '.svg': 'file',
    },
});
