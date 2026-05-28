import { env } from '$env/dynamic/public';

export const sanityConfig = {
	projectId: env.PUBLIC_SANITY_PROJECT_ID || '',
	dataset: env.PUBLIC_SANITY_DATASET || 'production',
	apiVersion: env.PUBLIC_SANITY_API_VERSION || '2025-03-25',
	useCdn: env.PUBLIC_SANITY_USE_CDN !== 'false'
};

export const isSanityConfigured = Boolean(sanityConfig.projectId && sanityConfig.dataset);
