import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import css from 'rollup-plugin-import-css';

export default [
  {
    input: 'src/index.js', // your entry point
    output: {
      name: pkg.name, // package name
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      resolve(),
      commonjs(),
      css(),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
  {
    input: 'src/index.js', // your entry point
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
    ],
    plugins: [
      css(),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
];
