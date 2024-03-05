/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
    parser: "@typescript-eslint/parser",
	extends: [
		'eslint:recommended',
		'prettier',
	],
	parserOptions: {
		ecmaVersion: 'latest',
        sourceType: "module",
	},
	plugins: [
		'@typescript-eslint',
		'prettier'
	],
	rules: {
		camelcase: 'off',
		'func-names': 'off',
		indent: 'off',
		'no-param-reassign': 'off',
		'no-process-exit': 'off',
		'no-restricted-globals': 'off',
		'no-underscore-dangle': ['error', { allow: ['_id', '__typename'] }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'prettier/prettier': 'error',
		'no-console': ['error', {
			allow: ['error', 'warn']
		}],
		'no-debugger': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		'linebreak-style': ['error', 'unix'],
		'no-lonely-if': 'error',
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: false
			}
		]
	},
}
