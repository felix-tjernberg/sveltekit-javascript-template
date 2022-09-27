import { init, register } from 'svelte-intl-precompile'

export function load() {
	register('en', () => import('$lib/locales/en.js'))
	init({
		fallbackLocale: 'en'
	})
}
