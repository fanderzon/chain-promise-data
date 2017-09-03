import buble from 'rollup-plugin-buble';

export default {  
  input: 'index.js',
  name: 'chain-promise-data',
  plugins: [
    buble()
  ],
  output: {
    file: `dist/index.${process.env.format}.js`,
    format: process.env.format,
  },
};