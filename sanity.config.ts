/// <reference types="vite/client" />

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes/index';

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID || 'ibrg4vy6';
const dataset = import.meta.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
	name: 'default',
	title: 'Demonstrength CMS',
	projectId,
	dataset,
	plugins: [structureTool()],
	schema: {
		types: schemaTypes
	}
});
