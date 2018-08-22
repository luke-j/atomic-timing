import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import string from 'rollup-plugin-string'
import multiEntry from 'rollup-plugin-multi-entry'

export default [
  {
    input: [
      'setup.js',
      'node_modules/first-input-delay/dist/first-input-delay.min.js'
    ],
    output: {
      format: 'iife',
      file: 'bin/setup.min.js'
    },
    plugins: [multiEntry(), terser()]
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
      })
    ]
  }
]
