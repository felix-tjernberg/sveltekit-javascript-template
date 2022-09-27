# SvelteKit Javascript Template

Some resonable defaults for quickly starting a SvelteKit prototype

## Setup

`pnpm install`

## Configuration/Usage

### PWA

Project has naively created a service worker for PWA support, change `/src/manifest.webmanifest` to suit your needs. In the static folder there are the [basic types of icons needed for a modern PWA](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs), more info can also be found [here](https://web.dev/learn/pwa/web-app-manifest/#icons)

### Imagetools

Project has [vite-plugin-imagetools](https://www.npmjs.com/package/vite-imagetools) installed, when importing images you can add query strings to the end of the path to resize the image, for example:

```js
<script>
  import srcsetAvif from '$lib/assets/images/someImage.jpg?w=500;700;900;1200&avif&srcset'
  import srcsetWebp from '$lib/assets/images/someImage.jpg?w=500;700;900;1200&webp&srcset'
  import { src, width, height } from '$lib/assets/images/someImage.jpg?width=300&metadata'
</script>
<picture>
  <source type="image/avif" srcset={srcsetAvif} />
  <source type="image/webp" srcset={srcsetWebp} />
  <img alt="Some description" {src} {height} {width} />
</picture>
```

### persistedWritable

Project has a persistedWritable function in `lib/utilities/persistedWritable.js` that is a simple way to add a writable store that persists in local storage, it takes a key and a default value, for example:

```js
// countStore.js
import { persistedWritable } from '$lib/utilities/persistedWritable.js'
export const count = persistedWritable('count', 0)
```

### Global CSS

Project imports `$lib/stylesheets/global.css` in `+layout.svelte` so static css should be placed in that folder

### I18 Implementation

Project has [`svelte-intl-precompile`](https://github.com/cibernox/svelte-intl-precompile) which is an i18 precompiler for svelte inspired from [`svelte-i18`](https://github.com/kaisermann/svelte-i18n), in `+layout.js` you can register you locales which should be placed in `src/lib/locales` and then you can use the `import {t, _} from 'svelte-intl-precompile'` function to translate strings and `import {locale} from 'svelte-intl-precompile'` to get the current locale. Formatting can be found [here](https://github.com/kaisermann/svelte-i18n/blob/main/docs/Formatting.md), for example:

```js
// lib/locales/en.js
export default {
  greeting: "Hello {name}"
}
// lib/locales/sv.js
export default {
  greeting: "Hejsan {name}"
}
```

```js
// SvelteComponent.svelte
<script>
import { _ } from 'svelte-intl-precompile'
</script>
<p>{$_('greeting', {values: {name: 'felix'}})}</p>
```

### SEO Reminder

Remember to add `<title>` and `<meta name="description" content="Some content">` elements inside of `<svelte:head>` for better SEO
