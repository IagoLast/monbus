import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

export default {
	entry: 'src/app.js',
	format: 'iife',
	dest: 'serve/scripts/app.js',
	plugins: [
		eslint({
			exclude: [
				'src/styles/**',
			]
		}),
		babel({
			exclude: 'node_modules/**',
		}),
	],
};
