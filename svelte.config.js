import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// Specify the output directory as 'public'
			outDir: 'public'
		}),
		// Add the prerender configuration for handleHttpError
		prerender: {
			handleHttpError: ({ status, path, referrer, message }) => {
				// Log the error for debugging
				console.error(`Error prerendering ${path}:`, { status, referrer, message });

				// Here you can decide how to handle different errors:
				if (status === 404) {
					// For 404 errors, you might want to silently ignore them or log them
					console.log(`404 encountered for ${path}, ignored.`);
					return;
				} else {
					// For other errors, you might want to fail the build
					throw new Error(`Failed to prerender ${path}: ${message}`);
				}
			}
		}
	},
	preprocess: vitePreprocess()
};

export default config;