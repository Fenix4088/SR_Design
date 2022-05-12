import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import svgr from '@svgr/rollup';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import analyze from 'rollup-plugin-analyzer';
import rollupPostcss from 'rollup-plugin-postcss';
// import urlFromImage from '@rollup/plugin-url';

import pkg from '../package.json';

const config = require('../scripts/config');

const sourceMap = config.__DEV__;

console.log(config);

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  cn: 'classnames',
  classnames: 'classnames',
};

const plugins = [
  peerDepsExternal(), // should be first in plugin list
  replace({
    'process.env.NODE_ENV': JSON.stringify(config.MODE),
    __DEV__: config.__DEV__,
    __PROD__: config.__PROD__,
    preventAssignment: true,
  }),
  nodeResolve({
    browser: true,
  }),
  typescript({
    tsconfig: './tsconfig.json',
    exclude: ['*/node_modules/*', '**/*.test.tsx', '**/*.test.ts'],
  }),
  commonjs({
    sourceMap,
  }),
  rollupPostcss({
    // extract: 'index.css',
    extract: false,
    modules: {
      generateScopedName: config.__DEV__ ? '[local]--[folder]--[hash:base64:3]' : '[hash:base64:6]',
    },
    minimize: config.__DEV__
      ? false
      : {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
    plugins: config.postCss.plugins,
  }),
  // urlFromImage({
  //   limit: 14336, // 14kb
  //   publicPath: '/images/',
  //   emitFiles: true,
  //   exclude: 'node_modules/**',
  //   include: ['**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp'],
  //   fileName: '[name][extname]',
  //   destDir: 'dist/images',
  // }),
  svgr({ icon: true }),

  config.__PROD__ &&
    terser({
      parse: {
        html5_comments: false,
      },
      mangle: true,
      compress: {
        defaults: true,
        drop_console: false, // false by default. Pass true to discard calls to console.* functions.
        keep_infinity: true, // false by default. Pass true to prevent Infinity from being compressed into 1/0, which may cause performance issues on Chrome.
        passes: 2, // 1 by default. The maximum number of times to run compress.
      },
      format: {
        comments: false, // "some" by default
        preamble: '', // null by default. When passed it must be a string and it will be prepended to the output literally. The source map will adjust for this text. Can be used to insert a comment containing licensing information, for example.
        quote_style: 3, // 0 by default. 3 - always use the original quotes.
        preserve_annotations: false, // false by default.
        ecma: 2020, // 5 by default. Desired EcmaScript standard version for output.
      },
      ecma: 2020, // 5 by default. Desired EcmaScript standard version for output.
      keep_classnames: false, // undefined by default.
      keep_fnames: false, // false by default.
      safari10: false, // false by default.
    }),
].filter(Boolean);

export default defineConfig([
  {
    input: 'src/index.ts',

    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: sourceMap,
        globals,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: sourceMap,
        globals,
      },
      {
        file: pkg['umd:main'],
        name: 'seaDesign',
        format: 'umd',
        sourcemap: sourceMap,
        globals,
      },
    ],

    watch: {
      clearScreen: false,
      exclude: 'node_modules/**',
      include: 'src/**',
    },

    plugins: [
      ...plugins,
      config.__PROD__ &&
        analyze({
          hideDeps: true,
          summaryOnly: true,
        }),
    ].filter(Boolean),
  },
  {
    input: 'src/app.tsx',

    output: [
      {
        file: 'public/index.js',
        format: 'iife',
        sourcemap: sourceMap,
        globals,
      },
    ],

    watch: {
      clearScreen: false,
      exclude: 'node_modules/**',
      include: 'src/**',
    },

    plugins,
  },
]);
