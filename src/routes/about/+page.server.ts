import { loadAboutPage } from '$lib/sanity/loaders';

export async function load() {
	return {
		aboutPage: await loadAboutPage()
	};
}
