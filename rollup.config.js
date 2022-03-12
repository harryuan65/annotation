import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: 'src/index.js', // your entry point
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
    ],
    plugins: [
      postcss({
        extensions: ['.css'],
      }),
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
];
