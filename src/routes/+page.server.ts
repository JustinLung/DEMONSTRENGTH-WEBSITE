import { loadHomePage } from '$lib/sanity/loaders';

export async function load() {
	return {
		homepage: await loadHomePage()
	};
}
