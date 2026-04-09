import { defineConfig } from 'astro/config'
import markdownIntegration from 'astro-md-2'

export default defineConfig({
	integrations: [
		markdownIntegration(),
	],
})
