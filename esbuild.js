const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
esbuild
  .build({
    entryPoints: ['./src/index.ts', './src/middleware/index.ts', './src/utils/index.ts'],
    outdir: 'dist',
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'node',
    format: 'cjs',
    target: 'node16',
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
