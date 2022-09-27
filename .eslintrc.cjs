module.exports = {
	env: { browser: true, es2017: true, node: true },
	extends: ['eslint:recommended', 'prettier'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
	plugins: ['svelte3'],
	root: true,
	rules: {
		'no-unused-vars': 'warn',
		'sort-imports': ['warn', { ignoreCase: true }],
		'sort-keys': ['warn', 'asc', { caseSensitive: false, natural: true }],
		'sort-vars': 'warn'
	}
}
