import type { LayoutServerLoad } from './$types';
import { loadSiteSettings } from '$lib/sanity/loaders';

export const load: LayoutServerLoad = async ({ url }) => {
	return {
		canonicalUrl: `${url.origin}${url.pathname}`,
		site: await loadSiteSettings()
	};
};
