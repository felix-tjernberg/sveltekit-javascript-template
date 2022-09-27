import adapter from '@sveltejs/adapter-auto'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import preprocess from 'svelte-preprocess'

const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: preprocess({
		postcss: { plugins: [autoprefixer('> 0.01%'), cssnano({ preset: 'default' })] }
	})
}

export default config
