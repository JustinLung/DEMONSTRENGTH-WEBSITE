import { loadSiteSettings } from '$lib/sanity/loaders';

export async function load() {
	return {
		site: await loadSiteSettings()
	};
}
