import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

export default {
	entry: 'src/app.js',
	format: 'iife',
	dest: 'monbus/scripts/app.js',
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
