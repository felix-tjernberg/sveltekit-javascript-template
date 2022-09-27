import { browser } from '$app/environment'
import { writable } from 'svelte/store'

export default function persistedWritable(storageKey, initialValue) {
	// This will first set the value of the writable to false during SSR, then on the first CSR the value will be set to the value from localStorage if it exists otherwise it will be set to the initialValue
	const storedValue = browser ? window.localStorage[storageKey] : false
	const store = writable(browser ? (storedValue ? storedValue : initialValue) : false)

	store.subscribe((value) => {
		if (browser) {
			window.localStorage[storageKey] = value
		}
	})

	return store
}
