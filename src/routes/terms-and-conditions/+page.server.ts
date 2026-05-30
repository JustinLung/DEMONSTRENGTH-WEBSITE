import { loadTermsAndConditionsPage } from '$lib/sanity/loaders';

export async function load() {
	return {
		termsAndConditionsPage: await loadTermsAndConditionsPage()
	};
}
