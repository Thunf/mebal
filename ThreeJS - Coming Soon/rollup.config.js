import uglify from 'rollup-plugin-uglify'

export default {
  input: 'js/index.js',
  output: {
  	file: 'bundle.js',
	format: 'iife'
  },
  plugins: [ uglify() ],
}
