<script>
	import '$lib/stylesheets/stylesheets.css'
	import { browser } from '$app/environment'
	import { locale } from 'svelte-intl-precompile'

	$: if (browser) document.documentElement.lang = $locale
</script>

<slot />
