import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/pattern-mock.min.js',
    name: 'patternMock',
    format: 'umd',
  },
  plugins: [commonjs(), terser()],
};