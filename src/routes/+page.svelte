<script>
	import { t } from 'svelte-intl-precompile'
</script>

<svelte:head>
	<title>SvelteKit Javascript Template</title>
	<meta name="description" content="SvelteKit Javascript Template" />
</svelte:head>

<h1>SvelteKit Javascript Template</h1>
<p class="bold-text">{$t('greeting', { values: { name: 'Felix' } })}</p>
