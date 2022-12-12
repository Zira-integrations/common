const esbuild = require('esbuild');
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
  })
  .catch(() => process.exit(1));
