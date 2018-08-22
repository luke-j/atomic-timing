import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import string from 'rollup-plugin-string'
import babel from 'rollup-plugin-babel'

export default [
  {
    input: 'setup.js',
    output: {
      format: 'iife',
      file: 'bin/setup.min.js'
    },
    plugins: [
      terser(),
      babel({
        exclude: ['node_modules/**']
      })
    ]
  },
  {
    input: 'index.js',
    output: {
      format: 'cjs',
      file: 'bin/index.js',
      globals: {
        window: 'window'
      }
    },
    plugins: [
      resolve({
        'jsnext:main': true
      }),
      commonjs(),
      terser(),
      string({
        include: 'bin/setup.min.js'
      }),
      babel({
        exclude: ['node_modules/**']
      })
    ]
  }
]
